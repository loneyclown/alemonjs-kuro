import { Expose, ExposeError, getCurrentEvent, type ExposeCallContext, type ExposeValueSchema } from 'alemonjs';
import { HELP_DATA, MORE_HELP_DATA } from '@src/img/views/Help';
import { apiBaseInfo, apiDailyInfo, apiExploreData, apiRoleData, apiRoleDetail, apiTowerDetail, getCookie } from './api';
import { getActiveUid, getUidList } from './db';
import { findMatchingRoles } from './roles';
import type { KuroApiResp } from './types';

export const WAVES_PROTOCOL = 'kuro.waves';
const string: ExposeValueSchema = { type: 'string' };
const number: ExposeValueSchema = { type: 'number' };
const boolean: ExposeValueSchema = { type: 'boolean' };
const object = (properties: Record<string, ExposeValueSchema>, required: string[] = []): ExposeValueSchema => ({
  type: 'object',
  properties,
  required,
  additionalProperties: false
});
const array = (items: ExposeValueSchema): ExposeValueSchema => ({ type: 'array', items });
const accountInput = object({ uid: { type: 'string', minLength: 9, maxLength: 9 } });
const characterInput = object(
  {
    uid: { type: 'string', minLength: 9, maxLength: 9 },
    character: { type: 'string', minLength: 1, maxLength: 80 }
  },
  ['character']
);

function resultSchema(data: ExposeValueSchema) {
  return object(
    {
      status: { type: 'string', enum: ['ok', 'not_bound', 'not_logged_in', 'error'] },
      message: string,
      uid: string,
      data
    },
    ['status', 'message']
  );
}

const props = array(object({ attributeName: string, attributeValue: string }, ['attributeName', 'attributeValue']));
const role = object(
  {
    roleId: number,
    roleName: string,
    level: number,
    starLevel: number,
    attributeName: string,
    weaponTypeName: string,
    chainUnlockNum: number
  },
  ['roleId', 'roleName']
);
const widget = object({ name: string, cur: number, total: number, status: number, value: string, refreshTimeStamp: number });
const daily = object({
  energyData: widget,
  storeEnergyData: widget,
  livenessData: widget,
  battlePassData: array(widget),
  weeklyData: widget,
  weeklyRougeData: widget,
  weeklyFrameData: widget,
  towerData: widget,
  slashTowerData: widget,
  newTowerData: widget,
  serverTime: number,
  activityData: object({ enabled: boolean, title: string, endTime: number })
});
const detail = object(
  {
    role,
    level: number,
    roleAttributeList: props,
    equipPhantomAddPropList: props,
    equipPhantomAttributeList: props,
    weaponData: object({
      weapon: object({ weaponId: number, weaponName: string, weaponStarLevel: number, weaponEffectName: string, effectDescription: string }),
      level: number,
      resonLevel: number,
      mainPropList: props
    }),
    chainList: array(object({ order: number, name: string, unlocked: boolean })),
    skillList: array(object({ level: number, skill: object({ id: number, name: string, type: string }) })),
    phantomData: object({
      cost: number,
      equipPhantomList: array(
        object({
          phantomProp: object({ phantomId: number, name: string, cost: number, quality: number }),
          cost: number,
          level: number,
          fetterDetail: object({ name: string, num: number }),
          mainProps: props,
          subProps: props
        })
      )
    })
  },
  ['role']
);
const exploration = object(
  {
    open: boolean,
    exploreList: array(
      object(
        {
          country: object({ countryId: number, countryName: string }, ['countryId', 'countryName']),
          countryProgress: string,
          areaInfoList: array(
            object({ areaId: number, areaName: string, areaProgress: number, itemList: array(object({ name: string, progress: number, type: number })) }, [
              'areaId',
              'areaName'
            ])
          )
        },
        ['country']
      )
    )
  },
  ['open']
);
const tower = object(
  {
    isUnlock: boolean,
    difficultyList: array(
      object({
        difficulty: number,
        difficultyName: string,
        towerAreaList: array(
          object({
            areaId: number,
            areaName: string,
            star: number,
            maxStar: number,
            floorList: array(object({ floor: number, star: number, roleList: array(object({ roleId: number })) }))
          })
        )
      })
    )
  },
  ['isUnlock']
);

// 仅投影契约声明的数据字段，不向其他插件透传凭据、内部用户编号或上游新增字段。
function project(schema: ExposeValueSchema, value: unknown): unknown {
  if (schema.type === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
    const source = value as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(schema.properties)
        .filter(([key]) => Object.hasOwn(source, key) && source[key] !== null && source[key] !== undefined)
        .map(([key, child]) => [key, project(child, source[key])])
    );
  }
  if (schema.type === 'array' && Array.isArray(value)) {
    return value.filter(item => item !== null).map(item => project(schema.items, item));
  }

  return value;
}

function authorizeUser(_input: unknown, context: ExposeCallContext): boolean {
  return !!context.callerApp && !!getCurrentEvent()?.UserKey;
}

function unwrap<T>(response: KuroApiResp<T>): T {
  if (!response.success || !response.data) {
    throw new Error('上游查询失败');
  }

  return response.data;
}

type QueryInput = { uid?: string; character?: string };
type QueryAccount = { uid: string; owner: string; cookie: string; signal: AbortSignal };
type QueryResult = { status: string; message: string; uid?: string; data?: unknown };

function accountAction(
  description: string,
  schema: ExposeValueSchema,
  query: (account: QueryAccount, input: QueryInput) => Promise<unknown>,
  inputSchema = accountInput
) {
  return Expose.action<QueryInput, QueryResult>({
    description,
    effect: 'read',
    inputSchema,
    outputSchema: resultSchema(schema),
    authorize: authorizeUser,
    async handler(input, context) {
      const owner = getCurrentEvent()?.UserKey;

      if (!owner) {
        throw new ExposeError('FORBIDDEN', '账号查询需要当前聊天用户上下文');
      }
      if (input.uid !== undefined && !/^\d{9}$/.test(input.uid)) {
        throw new ExposeError('INVALID_INPUT', 'uid 必须是9位数字');
      }
      if (input.character !== undefined && !input.character.trim()) {
        throw new ExposeError('INVALID_INPUT', '请输入角色名');
      }
      try {
        context.signal.throwIfAborted();
        const uids = await getUidList(owner);
        const uid = input.uid ?? (await getActiveUid(owner));

        if (!uid || !uids.includes(uid)) {
          return { status: 'not_bound', message: '请先登录或绑定本人的账号' };
        }
        context.signal.throwIfAborted();
        const credentials = await getCookie(uid, owner);

        if (!credentials) {
          return { status: 'not_logged_in', message: '请私聊发送 #mc登录 重新登录', uid };
        }
        context.signal.throwIfAborted();
        const data = await query({ uid, owner, cookie: credentials.cookie, signal: context.signal }, input);

        context.signal.throwIfAborted();

        return { status: 'ok', message: '', uid, data: project(schema, data) };
      } catch (error) {
        if (context.signal.aborted || error instanceof ExposeError) {
          throw error;
        }

        return { status: 'error', message: '查询暂不可用，请稍后重试' };
      }
    }
  });
}

export const wavesExpose = Expose.create().provide({
  name: WAVES_PROTOCOL,
  version: '1',
  displayName: '鸣潮助手',
  entryCommand: '#mc帮助',
  description: '鸣潮账号只读查询；账号身份取自当前聊天用户，不接受其他用户标识或凭据。',
  actions: {
    help: Expose.action<null, { name: string; commands: { name: string; command: string; private: boolean }[] }>({
      description: '查看当前开放的指令与用法，无需登录或聊天上下文',
      effect: 'read',
      inputSchema: { type: 'null' },
      outputSchema: object({ name: string, commands: array(object({ name: string, command: string, private: boolean }, ['name', 'command', 'private'])) }, [
        'name',
        'commands'
      ]),
      handler: () => ({
        name: '鸣潮助手',
        commands: [...HELP_DATA, ...MORE_HELP_DATA]
          .flatMap(category => category.items)
          .map(item => ({ name: item.name, command: item.command, private: !!item.private }))
      })
    }),
    accounts: Expose.action<Record<string, never>, QueryResult>({
      description: '查看当前聊天用户本人的绑定账号与激活账号，不返回凭据',
      effect: 'read',
      inputSchema: object({}),
      outputSchema: resultSchema(object({ uids: array(string), activeUid: string }, ['uids', 'activeUid'])),
      authorize: authorizeUser,
      async handler(_input, context) {
        const owner = getCurrentEvent()?.UserKey;

        if (!owner) {
          throw new ExposeError('FORBIDDEN', '账号查询需要当前聊天用户上下文');
        }
        try {
          context.signal.throwIfAborted();
          const uids = await getUidList(owner);
          const activeUid = await getActiveUid(owner);

          context.signal.throwIfAborted();

          return { status: 'ok', message: '', data: { uids, activeUid: activeUid && uids.includes(activeUid) ? activeUid : '' } };
        } catch (error) {
          if (context.signal.aborted) {
            throw error;
          }

          return { status: 'error', message: '账号列表暂不可用，请稍后重试' };
        }
      }
    }),
    base: accountAction(
      '查询本人账号基础信息',
      object({ name: string, level: number, worldLevel: number, roleNum: number, achievementCount: number }),
      async ({ uid, cookie, owner }) => unwrap(await apiBaseInfo(uid, cookie, owner))
    ),
    daily: accountAction('查询本人体力、活跃度、电台及周常摘要；total=0 表示未提供上限', daily, async ({ uid, cookie, owner }) => {
      return unwrap(await apiDailyInfo(uid, cookie, owner));
    }),
    roles: accountAction('查询本人拥有的角色列表与练度', object({ roleList: array(role) }, ['roleList']), async ({ uid, cookie, owner }) => {
      return unwrap(await apiRoleData(uid, cookie, owner));
    }),
    character: accountAction(
      '按角色名查询本人角色的最终属性、武器、技能、声骸；完整名字优先，重名时要求补全',
      detail,
      async ({ uid, cookie, owner, signal }, input) => {
        const name = input.character?.trim() ?? '';
        const data = unwrap(await apiRoleData(uid, cookie, owner));
        const matches = findMatchingRoles(data.roleList ?? [], name);

        if (matches.length !== 1) {
          // 只返回本人的候选名称，不把上游错误或凭据带入异常。
          throw new ExposeError(
            'INVALID_INPUT',
            matches.length ? `请使用完整角色名：${matches.map(item => item.roleName).join('、')}` : '当前账号未找到该角色'
          );
        }
        signal.throwIfAborted();

        const dataDetail = unwrap(await apiRoleDetail(uid, cookie, owner, matches[0].roleId));

        return {
          ...dataDetail,
          ...(dataDetail.phantomData
            ? {
                phantomData: {
                  ...dataDetail.phantomData,
                  equipPhantomList: dataDetail.phantomData.equipPhantomList?.filter(echo => !!echo?.phantomProp) ?? []
                }
              }
            : {})
        };
      },
      characterInput
    ),
    exploration: accountAction('查询本人各地区和子区域探索度；未公开时不返回残留的地区数据', exploration, async ({ uid, cookie, owner }) => {
      const data = unwrap(await apiExploreData(uid, cookie, owner));

      return data.open ? data : { open: false, exploreList: [] };
    }),
    tower: accountAction('查询本人逆境深塔难度、区域星数及楼层记录', tower, async ({ uid, cookie, owner }) => unwrap(await apiTowerDetail(uid, cookie, owner)))
  }
});

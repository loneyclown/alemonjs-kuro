import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import EMBLEM from '@src/assets/img/help/icons/矩阵.png';
import type { MatrixMode, MatrixResp, MatrixTeam } from '@src/model/types';
import React from 'react';
import HTML from './HTML';

const NAMES: Record<number, string> = { 1: '奇点扩张', 0: '稳态协议' };
const NUMBER = new Intl.NumberFormat('zh-CN');
const END_DATE = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', dateStyle: 'medium', timeStyle: 'short' });

const CSS = `
.matrix-sheet{position:relative;width:1000px;overflow:hidden;border-radius:24px;
background:#30364b;color:#293044;text-align:left;font-family:"Microsoft YaHei",sans-serif}
.matrix-sheet *{box-sizing:border-box}
.matrix-backdrop{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:.63}
.matrix-content{position:relative;padding:30px 28px 24px;background:linear-gradient(180deg,#21263833,#212638bd)}
.matrix-hero{display:flex;align-items:center;gap:20px;padding:8px 18px 25px;color:#f8ead2}
.matrix-hero img{width:76px;height:76px;object-fit:contain}
.matrix-brand{font-size:14px;letter-spacing:3px;color:#e0cba4}
.matrix-hero h1{margin:7px 0 0;font:48px "tttgbnumber","SimSun",serif;letter-spacing:4px}
.matrix-uid{margin-left:auto;align-self:flex-end;padding:7px 16px;border:1px solid #dfc994aa;border-radius:20px;background:#252b42cc;font-size:16px}
.matrix-season{display:flex;flex-wrap:wrap;gap:18px 32px;margin-bottom:16px;padding:12px 18px;
border:1px solid #d9bf8c;border-radius:12px;background:#282f45dc;color:#f1e3c7;font-size:16px}
.matrix-modes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.matrix-modes.single{grid-template-columns:1fr}
.matrix-mode{min-width:0;padding:21px;border:1px solid #e0cda4;border-radius:18px;outline:1px solid #ffffff99;
outline-offset:-5px;background:linear-gradient(135deg,#faf8f1,#dfe2ee);box-shadow:0 7px 22px #12182850}
.matrix-mode h2{margin:0 0 14px;padding-bottom:11px;border-bottom:1px solid #aeb2c288;font:27px "tttgbnumber","SimSun",serif;letter-spacing:2px}
.matrix-mode h2 span{margin-right:8px;color:#9b722d}
.matrix-metrics{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.matrix-metrics small{display:block;color:#555e74;font-size:14px}
.matrix-metrics strong{display:block;margin-top:4px;color:#835b20;font-size:34px;font-variant-numeric:tabular-nums;line-height:1.1}
.matrix-progress{text-align:right}
.matrix-progress b{display:block;margin-top:4px;font-size:22px}
.matrix-track{height:8px;margin-top:12px;border-radius:6px;background:#c0c4d5;overflow:hidden}
.matrix-track span{display:block;height:100%;background:linear-gradient(90deg,#b08847,#f5d791)}
.matrix-empty{margin:0;font-size:16px;color:#555e74}
.matrix-teams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:17px}
.matrix-team{padding:13px 14px;border:1px solid #b9bfd1;border-radius:11px;background:#f8f9fd8c}
.matrix-team-head{display:flex;gap:8px;justify-content:space-between;align-items:baseline;font-size:16px;font-weight:700}
.matrix-team-head b{color:#835b20;font-size:20px}
.matrix-roles{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 0}
.matrix-role{width:52px;height:52px;border:1px solid #bea674;border-radius:9px;background:#394052;
color:#f4e5c9;display:grid;place-items:center;font-size:13px;overflow:hidden}
.matrix-role img{width:100%;height:100%;object-fit:cover}
.matrix-team-progress{margin:9px 0 0;color:#535e74;font-size:14px}
.matrix-buffs{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0 0}
.matrix-buff{display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:4px 7px;
border-radius:6px;background:#e2e3ee;color:#3b4255;font-size:13px;overflow-wrap:anywhere}
.matrix-buff img{width:22px;height:22px;object-fit:contain}
.matrix-footer{margin:16px 2px 0;color:#eee0c5;font-size:15px}
`;

const httpsImage = (url?: string | null) => (url?.startsWith('https://') ? url : undefined);
const progressPercent = ({ passBoss, bossCount }: MatrixMode | MatrixTeam) => {
  if (typeof passBoss !== 'number' || typeof bossCount !== 'number' || bossCount <= 0) {
    return undefined;
  }

  return Math.min(100, Math.max(0, (passBoss / bossCount) * 100));
};

function Team({ team, index }: { team: MatrixTeam; index: number }) {
  const roles = team.roleList ?? [];
  const icons = team.roleIcons ?? [];
  const roster = Array.from({ length: Math.max(roles.length, icons.length) }, (_, slot) => ({
    id: roles[slot]?.roleId,
    icon: httpsImage(roles[slot]?.iconUrl) ?? httpsImage(icons[slot])
  })).filter(role => Boolean(role.id) || Boolean(role.icon));

  return (
    <div className='matrix-team'>
      <div className='matrix-team-head'>
        <span>
          队伍 {index + 1}
          {team.round ? ` · 第 ${team.round} 轮` : ''}
        </span>
        {typeof team.score === 'number' && <b>{NUMBER.format(team.score)} 分</b>}
      </div>
      {roster.length > 0 && (
        <div className='matrix-roles'>
          {roster.map((role, slot) => (
            <div className='matrix-role' key={slot}>
              {role.icon ? <img src={role.icon} alt={role.id ? `角色 ${role.id}` : '出战角色'} /> : role.id}
            </div>
          ))}
        </div>
      )}
      {progressPercent(team) !== undefined && (
        <p className='matrix-team-progress'>
          首领击破 {team.passBoss} / {team.bossCount}
        </p>
      )}
      {team.buffs?.some(buff => Boolean(buff?.buffName) || Boolean(httpsImage(buff?.buffIcon))) && (
        <div className='matrix-buffs'>
          {team.buffs.map((buff, slot) => {
            const icon = httpsImage(buff?.buffIcon);

            return (
              (Boolean(icon) || Boolean(buff?.buffName)) && (
                <span className='matrix-buff' key={slot}>
                  {icon && <img src={icon} alt={buff?.buffName ? '' : '队伍增益'} />}
                  {buff?.buffName}
                </span>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

function Mode({ mode, detailed }: { mode: MatrixMode; detailed: boolean }) {
  const teams = (mode.teams ?? []).filter(team => team !== null);
  const progress = progressPercent(mode);
  const record = mode.hasRecord ?? (typeof mode.score === 'number' || teams.length > 0);

  return (
    <section className='matrix-mode'>
      <h2>
        <span aria-hidden='true'>◆</span>
        {NAMES[mode.modeId] ?? `玩法 ${mode.modeId}`}
      </h2>
      {mode.isUnlock === false || !record ? (
        <p className='matrix-empty'>{mode.isUnlock === false ? '尚未解锁' : '本期暂无挑战记录'}</p>
      ) : (
        <>
          <div className='matrix-metrics'>
            <div>
              <small>本期得分</small>
              <strong>{typeof mode.score === 'number' ? NUMBER.format(mode.score) : '—'}</strong>
            </div>
            {progress !== undefined && (
              <div className='matrix-progress'>
                <small>首领击破</small>
                <b>
                  {mode.passBoss} / {mode.bossCount}
                </b>
              </div>
            )}
          </div>
          {progress !== undefined && (
            <div className='matrix-track' aria-hidden='true'>
              <span style={{ width: `${progress}%` }} />
            </div>
          )}
          {detailed &&
            (teams.length > 0 ? (
              <div className='matrix-teams'>
                {teams.map((team, index) => (
                  <Team team={team} index={index} key={index} />
                ))}
              </div>
            ) : (
              <p className='matrix-team-progress'>本期暂无队伍详情</p>
            ))}
        </>
      )}
    </section>
  );
}

export default function MatrixCard({ data }: { data: { uid: string; matrix: MatrixResp; modeId?: number } }) {
  const { uid, matrix, modeId } = data;
  const modes = (matrix.modeDetails ?? []).filter((mode): mode is MatrixMode => mode !== null && (modeId === undefined || mode.modeId === modeId));
  const timestamp = matrix.endTime ?? 0;
  const end = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
  const endTime = timestamp > 0 && Number.isFinite(end.getTime()) ? END_DATE.format(end) : undefined;
  const reward = typeof matrix.reward === 'number' && typeof matrix.totalReward === 'number' && matrix.totalReward > 0;
  const empty = matrix.isUnlock === false ? '终焉矩阵尚未解锁' : modes.length === 0 ? '库街区暂未返回当前玩法数据' : undefined;

  return (
    <HTML style={{ width: '1000px' }}>
      <style>{CSS}</style>
      <main className='matrix-sheet'>
        <img className='matrix-backdrop' src={BACKGROUND} alt='' />
        <div className='matrix-content'>
          <header className='matrix-hero'>
            <img src={EMBLEM} alt='' />
            <div>
              <div className='matrix-brand'>鸣潮助手</div>
              <h1>终焉矩阵</h1>
            </div>
            <span className='matrix-uid'>UID {uid}</span>
          </header>
          {!empty && (Boolean(endTime) || reward) && (
            <div className='matrix-season'>
              {endTime && <span>赛季结束 {endTime}</span>}
              {reward && (
                <span>
                  本期奖励已领取 {matrix.reward} / {matrix.totalReward}
                </span>
              )}
            </div>
          )}
          {empty ? (
            <section className='matrix-mode'>
              <p className='matrix-empty'>{empty}</p>
            </section>
          ) : (
            <div className={`matrix-modes${modes.length === 1 ? ' single' : ''}`}>
              {modes.map(mode => (
                <Mode key={mode.modeId} mode={mode} detailed={modeId !== undefined} />
              ))}
            </div>
          )}
          <footer className='matrix-footer'>{modeId === undefined ? '队伍详情　#mc奇点扩张　·　#mc稳态协议' : '矩阵总览　#mc矩阵'}</footer>
        </div>
      </main>
    </HTML>
  );
}

import AnnCard from '@src/img/views/AnnCard';
import CalabashCard from '@src/img/views/CalabashCard';
import CalendarCard from '@src/img/views/CalendarCard';
import ChallengeCard from '@src/img/views/ChallengeCard';
import CharDetailCard from '@src/img/views/CharDetailCard';
import CharlistCard from '@src/img/views/CharlistCard';
import CoinCard from '@src/img/views/CoinCard';
import DevelopCard from '@src/img/views/DevelopCard';
import EchoListCard from '@src/img/views/EchoListCard';
import ExploreCard from '@src/img/views/ExploreCard';
import GachaCard from '@src/img/views/GachaCard';
import WuwaHelp from '@src/img/views/Help';
import LoginHelpCard from '@src/img/views/LoginHelpCard';
import PeriodCard from '@src/img/views/PeriodCard';
import PokerCard from '@src/img/views/PokerCard';
import PoolCard from '@src/img/views/PoolCard';
import RankCard from '@src/img/views/RankCard';
import RoleInfoCard from '@src/img/views/RoleInfoCard';
import SignCard from '@src/img/views/SignCard';
import StaminaCard from '@src/img/views/StaminaCard';
import TowerCard from '@src/img/views/TowerCard';
import WikiCard from '@src/img/views/WikiCard';
import { defineConfig } from 'jsxp';
import React from 'react';

export default defineConfig({
  routes: {
    '/wuwa-help': {
      component: <WuwaHelp />
    },
    '/login-help': {
      component: (
        <LoginHelpCard
          data={{
            qrDataUrl:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAklEQVR4AewaftIAAAW6SURBVO3Bwa0rSRIEQY8E9Vc59gMrQNeh0I+cdLP0HyStNEhaa5C01iBprUHSWoOktQZJaw2S1hokrTVIWuvDoSQI2nJLEm5pyy9LwpO2nEiCoC1PBklrDZLWGiStNUhaa5C01iBprUHSWoOktT5c1JZflgRBEk605UkSTrTlTW35ZUm4YZC01iBprUHSWoOktQZJaw2S1hokrTVIWmuQtNaHP5CEN7XlbUl40pYTSXhTW25pyy9Lwpva8qZB0lqDpLUGSWsNktYaJK01SFprkLTWIGmtD/ozSTjRlidJ+GVt0fsGSWsNktYaJK01SFprkLTWIGmtQdJag6S1BklrfdCfacstbTmRhCdtOZGEJ205kYQnbdFdg6S1BklrDZLWGiStNUhaa5C01iBprUHSWh/+QFt0VxJuScKJtjxJwi9ry3/ZIGmtQdJag6S1BklrDZLWGiStNUhaa5C01iBprQ8XJUH3JeFJW04k4UlbTiThSVtOJOFNSRAMktYaJK01SFprkLTWIGmtQdJag6S1BklrfTjUFt2VhFuScKIt/3Vt0ZlB0lqDpLUGSWsNktYaJK01SFprkLTWIGmtQdJa6T8cSMKTtpxIwq9qyy1JuKUtJ5JwS1u+URJ+VVveNEhaa5C01iBprUHSWoOktQZJaw2S1hokrfXhUFve1JZbknCiLbck4Za2/Ncl4Za2PEnCiba8KQkn2nLDIGmtQdJag6S1BklrDZLWGiStNUhaa5C01iBprfQfDiThSVtuScItbTmRhCdtOZGEW9rypiS8rS1PkvDL2vIkCbe05ckgaa1B0lqDpLUGSWsNktYaJK01SFprkLTWh0NteZKEW9pyIgm3tOVJEm5pyy1JuKUtv6wtT5Jwoi1vasuJJNwwSFprkLTWIGmtQdJag6S1BklrDZLWGiStNUha68OhJDxpyy1JONGWW5LwjZLwpiT8siTckoQnbTmRhG8zSFprkLTWIGmtQdJag6S1BklrDZLWGiStlf7DgSTc0pZbkvCkLbck4Za2vC0JT9rytiTc0pYnSTjRlidJONGWJ0k40ZYbBklrDZLWGiStNUhaa5C01iBprUHSWoOktQZJa324qC3fKAlva8uTJJxoyy1teZKEE215koS3JeGWJHyjJDxpy5NB0lqDpLUGSWsNktYaJK01SFprkLTWIGmtD38gCW9qyy9LwpvaciIJ36gtT5JwS1tuacuJJNwwSFprkLTWIGmtQdJag6S1BklrDZLWGiStNUha68MCSXhbW5605W1JeJKEX5aEb5SEJ2050ZYbBklrDZLWGiStNUhaa5C01iBprUHSWoOktdJ/0HVJeNKWW5Jwoi1PknCiLbck4Ulb3paEW9rybQZJaw2S1hokrTVIWmuQtNYgaa1B0lqDpLUGSWt9OJQEQVtOtOVJEm5py9uS8KQtb0vCk7bc0pYTSXhTW54MktYaJK01SFprkLTWIGmtQdJag6S1BklrfbioLb8sCbck4UlbTiThTW05kYRv1JY3JeFEW77NIGmtQdJag6S1BklrDZLWGiStNUhaa5C01iBprQ9/IAlvast/XRK+URJuScI3asuJJDxpy5sGSWsNktYaJK01SFprkLTWIGmtQdJag6S1PujrteVJEk605UkSTrTlliQ8acuJJDxpy4kkPEnCLUm4pS1PBklrDZLWGiStNUhaa5C01iBprUHSWoOktQZJa33Qn0nCLW25pS0nkvCN2nJLW54k4Za2nEjCDYOktQZJaw2S1hokrTVIWmuQtNYgaa1B0lof/kBb/uva8iQJtyThRFt+VRJOtOVJEt7Wlm8zSFprkLTWIGmtQdJag6S1BklrDZLWGiStNUha68NFSdD/JeEbJeGWtuhcEr7NIGmtQdJag6S1BklrDZLWGiStNUhaa5C0VvoPklYaJK01SFprkLTWIGmtQdJag6S1BklrDZLW+h/pfn8oNtYTVgAAAABJRU5ErkJggg=='
          }}
        />
      )
    },
    '/stamina': {
      component: (
        <StaminaCard
          data={{
            uid: '100000001',
            daily: {
              energyData: { cur: 180, total: 240, refreshTimeStamp: Math.floor(Date.now() / 1000) + 7200 },
              livenessData: { cur: 80, total: 100 },
              battlePassData: [],
              shopDataList: []
            },
            base: {
              name: '漂泊者',
              id: 100000001,
              level: 60,
              worldLevel: 6,
              roleNum: 25,
              phantomNum: 300,
              achievementCount: 150,
              boxNum: 500,
              soundLevel: 30,
              bigWorldLevel: 6
            }
          }}
        />
      )
    },
    '/roleinfo': {
      component: (
        <RoleInfoCard
          data={{
            uid: '100000001',
            base: {
              name: '漂泊者',
              id: 100000001,
              level: 60,
              worldLevel: 6,
              roleNum: 3,
              phantomNum: 100,
              achievementCount: 50,
              boxNum: 200,
              soundLevel: 20,
              bigWorldLevel: 6
            },
            roles: [
              { roleId: 1001, roleName: '吟霖', roleIconUrl: '', starLevel: 5, level: 90, breach: 6, attributeId: 1, attributeName: '凝夜白霜', weaponTypeId: 1, chain: [], chainCount: 2 },
              { roleId: 1002, roleName: '安可', roleIconUrl: '', starLevel: 5, level: 80, breach: 5, attributeId: 2, attributeName: '熔山裂谷', weaponTypeId: 2, chain: [], chainCount: 0 },
              { roleId: 1003, roleName: '鉴心', roleIconUrl: '', starLevel: 4, level: 70, breach: 4, attributeId: 3, attributeName: '彻空冥雷', weaponTypeId: 1, chain: [], chainCount: 4 }
            ]
          }}
        />
      )
    },
    '/explore': {
      component: (
        <ExploreCard
          data={{
            uid: '100000001',
            base: {
              name: '漂泊者',
              id: 100000001,
              level: 60,
              worldLevel: 6,
              roleNum: 25,
              phantomNum: 300,
              achievementCount: 150,
              boxNum: 500,
              soundLevel: 30,
              bigWorldLevel: 6
            },
            explore: {
              open: true,
              exploreList: [
                {
                  country: { countryId: 1, countryName: '瑝珑', detailPageFontColor: '', detailPagePic: '', detailPageProgressColor: '', homePageIcon: '' },
                  countryProgress: '85',
                  areaInfoList: [
                    {
                      areaId: 1,
                      areaName: '中曲台地',
                      areaProgress: 100,
                      itemList: [
                        { name: '宝箱', progress: 100, type: 1 },
                        { name: '景点', progress: 100, type: 2 }
                      ]
                    },
                    {
                      areaId: 2,
                      areaName: '荒石高地',
                      areaProgress: 62,
                      itemList: [
                        { name: '宝箱', progress: 63, type: 1 },
                        { name: '景点', progress: 62, type: 2 }
                      ]
                    }
                  ]
                }
              ]
            }
          }}
        />
      )
    },
    '/sign': {
      component: (
        <SignCard
          data={{
            uid: '100000001',
            sign: {
              sigInNum: 5,
              hasSignIn: true,
              sigInDTOList: Array.from({ length: 7 }, (_, i) => ({
                id: `${i + 1}`,
                goodsName: i < 3 ? '星声' : '贝币',
                goodsNum: i < 3 ? 20 : 10000,
                goodsUrl: '',
                sigInStatus: i < 5 ? 1 : 0
              }))
            }
          }}
        />
      )
    },
    '/tower': {
      component: (
        <TowerCard
          data={{
            uid: '100000001',
            base: {
              name: '漂泊者',
              id: 100000001,
              level: 60,
              worldLevel: 6,
              roleNum: 25,
              phantomNum: 300,
              achievementCount: 150,
              boxNum: 500,
              soundLevel: 30,
              bigWorldLevel: 6
            },
            tower: {
              isUnlock: true,
              difficultyList: [
                {
                  difficulty: 1,
                  difficultyName: '稳定区',
                  towerAreaList: [
                    {
                      areaId: 1,
                      areaName: '第一区',
                      maxStar: 9,
                      star: 9,
                      floorList: [
                        { floor: 1, picUrl: '', star: 3, roleList: [] },
                        { floor: 2, picUrl: '', star: 3, roleList: [] },
                        { floor: 3, picUrl: '', star: 3, roleList: [] }
                      ]
                    }
                  ]
                }
              ]
            }
          }}
        />
      )
    },
    '/challenge': {
      component: (
        <ChallengeCard
          data={{
            uid: '100000001',
            base: { name: '漂泊者', id: 100000001, level: 60, worldLevel: 6, roleNum: 25, phantomNum: 300, achievementCount: 150, boxNum: 500, soundLevel: 30, bigWorldLevel: 6 },
            challenge: {
              isUnlock: true,
              difficultyList: [
                {
                  difficulty: 1,
                  difficultyName: '常规挑战',
                  towerAreaList: [
                    {
                      areaId: 1,
                      areaName: '挑战一',
                      maxStar: 9,
                      star: 7,
                      floorList: [
                        { floor: 1, picUrl: '', star: 3, roleList: [] },
                        { floor: 2, picUrl: '', star: 3, roleList: [] },
                        { floor: 3, picUrl: '', star: 1, roleList: [] }
                      ]
                    }
                  ]
                }
              ]
            },
            title: '全息战略',
            icon: '🔮'
          }}
        />
      )
    },
    '/charlist': {
      component: (
        <CharlistCard
          data={{
            uid: '100000001',
            base: { name: '漂泊者', id: 100000001, level: 60, worldLevel: 6, roleNum: 5, phantomNum: 300, achievementCount: 150, boxNum: 500, soundLevel: 30, bigWorldLevel: 6 },
            roles: [
              { roleId: 1001, roleName: '吟霖', roleIconUrl: '', starLevel: 5, level: 90, breach: 6, attributeId: 1, attributeName: '冰', weaponTypeId: 1, chain: [], chainCount: 2 },
              { roleId: 1002, roleName: '安可', roleIconUrl: '', starLevel: 5, level: 80, breach: 5, attributeId: 2, attributeName: '火', weaponTypeId: 2, chain: [], chainCount: 0 },
              { roleId: 1003, roleName: '鉴心', roleIconUrl: '', starLevel: 4, level: 70, breach: 4, attributeId: 3, attributeName: '雷', weaponTypeId: 1, chain: [], chainCount: 4 },
              { roleId: 1004, roleName: '维里奈', roleIconUrl: '', starLevel: 5, level: 90, breach: 6, attributeId: 4, attributeName: '光', weaponTypeId: 3, chain: [], chainCount: 1 },
              { roleId: 1005, roleName: '散华', roleIconUrl: '', starLevel: 4, level: 60, breach: 3, attributeId: 5, attributeName: '风', weaponTypeId: 2, chain: [], chainCount: 6 }
            ]
          }}
        />
      )
    },
    '/coin': {
      component: (
        <CoinCard
          data={{
            uid: '100000001',
            mine: {
              goldNum: 12580,
              userName: '漂泊者',
              userId: '10000001',
              headUrl: '',
              signature: '鸣潮，启动！'
            }
          }}
        />
      )
    },
    '/announce': {
      component: (
        <AnnCard
          data={{
            activities: [
              { id: '1', postId: '1', title: '2.3版本「涌潮纪行」活动公告', coverUrl: '', publishTime: '2026-03-25 10:00', eventType: '1' },
              { id: '2', postId: '2', title: '限时角色祈愿活动「浮声掠影」开启', coverUrl: '', publishTime: '2026-03-24 10:00', eventType: '1' }
            ],
            notices: [
              { id: '3', postId: '3', title: '《鸣潮》2.3版本更新公告', coverUrl: '', publishTime: '2026-03-20 06:00', eventType: '3' },
              { id: '4', postId: '4', title: '3月28日停服维护公告', coverUrl: '', publishTime: '2026-03-27 18:00', eventType: '3' }
            ]
          }}
        />
      )
    },
    '/gacha': {
      component: (
        <GachaCard
          data={{
            uid: '100000001',
            pools: [
              { poolName: '角色精准调谐', poolType: '1', total: 120, star5List: [{ name: '吟霖', count: 78, time: '2026-03-01' }], star4Count: 12, star3Count: 107, pity: 42, avg: 78, avgUp: 78, luckLevel: 1, star5Items: [{ name: '吟霖', count: 78, time: '2026-03-01', isUp: true, resourceType: '角色' }] },
              { poolName: '武器精准调谐', poolType: '2', total: 60, star5List: [], star4Count: 6, star3Count: 54, pity: 60, avg: null, avgUp: null, luckLevel: 2, star5Items: [] }
            ]
          }}
        />
      )
    },
    '/chardetail': {
      component: (
        <CharDetailCard
          data={{
            uid: '100000001',
            detail: {
              role: { roleId: 1001, roleName: '吟霖', roleIconUrl: '', starLevel: 5, level: 90, breach: 6, attributeId: 1, attributeName: '冰', weaponTypeId: 1, chain: [], chainCount: 2 },
              level: 90,
              chainList: [
                { order: 1, name: '链1', iconUrl: '', unlocked: true },
                { order: 2, name: '链2', iconUrl: '', unlocked: true },
                { order: 3, name: '链3', iconUrl: '', unlocked: false },
                { order: 4, name: '链4', iconUrl: '', unlocked: false },
                { order: 5, name: '链5', iconUrl: '', unlocked: false },
                { order: 6, name: '链6', iconUrl: '', unlocked: false }
              ],
              weaponData: { weaponId: 1, weaponName: '苍鳞千嶂', weaponStarLevel: 5, weaponIcon: '', weaponType: 1, level: 90, breach: 6, resonLevel: 1 },
              phantomData: { cost: 12, equipPhantomList: [] },
              skillList: [
                { skillId: 1, skillName: '普通攻击', iconUrl: '', level: 10, type: 'Normal' },
                { skillId: 2, skillName: '共鸣技能', iconUrl: '', level: 10, type: 'Skill' },
                { skillId: 3, skillName: '共鸣解放', iconUrl: '', level: 10, type: 'Liberation' }
              ]
            }
          }}
        />
      )
    },
    '/calabash': {
      component: (
        <CalabashCard
          data={{
            uid: '100000001',
            calabash: { level: 16, baseCatch: 100, strengthenCatch: 50, catchQuality: 5, cost: 12, maxCost: 12, phantomList: [] }
          }}
        />
      )
    },
    '/calendar': {
      component: (
        <CalendarCard
          data={{
            events: [
              { title: '限时角色调谐 — 吟霖', startTime: '2026-03-20', endTime: '2026-04-10', type: 'gacha', isActive: true },
              { title: '「浮光掠影」活动', startTime: '2026-03-22', endTime: '2026-04-05', type: 'activity', isActive: true },
              { title: '逆境深塔 S4赛季', startTime: '2026-04-01', endTime: '2026-04-28', type: 'tower', isActive: false }
            ]
          }}
        />
      )
    },
    '/period': {
      component: (
        <PeriodCard
          data={{
            uid: '100000001',
            periodType: 'month',
            periodTitle: '2026年3月',
            detail: { totalStar: 4800, totalCoin: 320000, coinList: [], starList: [], itemList: [] }
          }}
        />
      )
    },
    '/develop': {
      component: (
        <DevelopCard
          data={{
            uid: '100000001',
            roles: [
              { roleId: 1001, roleName: '吟霖' },
              { roleId: 1002, roleName: '安可' }
            ],
            costs: [
              { id: 1, name: '割裂晶核', quality: 5, num: 12, iconUrl: '' },
              { id: 2, name: '裂变能', quality: 4, num: 35, iconUrl: '' },
              { id: 3, name: '贝币', quality: 3, num: 250000, iconUrl: '' }
            ]
          }}
        />
      )
    },
    '/poker': {
      component: (
        <PokerCard
          data={{
            uid: '100000001',
            battle: {
              level: 15,
              levelName: '大师',
              exp: 3200,
              expLimit: 5000,
              cardNum: 120,
              maxCardNum: 200,
              badgeNum: 2,
              maxBadgeNum: 5,
              badgeList: [
                { name: '初入牌局', description: '完成首次对弈', unlock: true },
                { name: '百战不殆', description: '累计胜利100场', unlock: true },
                { name: '常胜将军', description: '连胜10场', unlock: false }
              ]
            },
            base: { name: '漂泊者', id: 100000001, level: 60, worldLevel: 6, roleNum: 25, phantomNum: 300, achievementCount: 150, boxNum: 500, soundLevel: 30, bigWorldLevel: 6 }
          }}
        />
      )
    },
    '/rank': {
      component: (
        <RankCard
          data={{
            uid: '100000001',
            playerName: '漂泊者',
            entries: [
              { uid: '100000001', roleName: '吟霖', roleIconUrl: '', starLevel: 5, level: 90, chainCount: 2, attributeName: '冰', weaponName: '苍鳞千嶂', weaponStarLevel: 5, weaponLevel: 90, resonLevel: 1, score: 175 },
              { uid: '100000001', roleName: '安可', roleIconUrl: '', starLevel: 5, level: 80, chainCount: 0, attributeName: '火', weaponName: '无妄', weaponStarLevel: 4, weaponLevel: 80, resonLevel: 1, score: 130 },
              { uid: '100000001', roleName: '鉴心', roleIconUrl: '', starLevel: 4, level: 70, chainCount: 4, attributeName: '雷', weaponName: '千古洑流', weaponStarLevel: 3, weaponLevel: 70, resonLevel: 1, score: 120 }
            ]
          }}
        />
      )
    },
    '/wiki': {
      component: (
        <WikiCard
          data={{
            uid: '100000001',
            detail: {
              role: { roleId: 1001, roleName: '吟霖', roleIconUrl: '', starLevel: 5, level: 90, breach: 6, attributeId: 1, attributeName: '冰', weaponTypeId: 1, chain: [], chainCount: 2 },
              level: 90,
              chainList: [
                { order: 1, name: '链1', iconUrl: '', unlocked: true },
                { order: 2, name: '链2', iconUrl: '', unlocked: true },
                { order: 3, name: '链3', iconUrl: '', unlocked: false },
                { order: 4, name: '链4', iconUrl: '', unlocked: false },
                { order: 5, name: '链5', iconUrl: '', unlocked: false },
                { order: 6, name: '链6', iconUrl: '', unlocked: false }
              ],
              weaponData: { weaponId: 1, weaponName: '苍鳞千嶂', weaponStarLevel: 5, weaponIcon: '', weaponType: 1, level: 90, breach: 6, resonLevel: 1 },
              phantomData: { cost: 12, equipPhantomList: [] },
              skillList: [
                { skillId: 1, skillName: '普通攻击·冰', iconUrl: '', level: 10, type: 'Normal' },
                { skillId: 2, skillName: '共鸣技能·凝霜', iconUrl: '', level: 10, type: 'Skill' },
                { skillId: 3, skillName: '共鸣解放·白霜', iconUrl: '', level: 10, type: 'Liberation' }
              ]
            },
            queryType: 'skills'
          }}
        />
      )
    },
    '/echolist': {
      component: (
        <EchoListCard
          data={{
            uid: '100000001',
            playerName: '漂泊者',
            echoes: [
              { roleId: 1001, roleName: '吟霖', roleIconUrl: '', phantomName: '鸣钟之龟', phantomIconUrl: '', level: 25, cost: 4, fetterName: '凝夜白霜', mainProps: [{ attributeName: '攻击', attributeValue: '352' }], subProps: [{ attributeName: '暴击率', attributeValue: '8.4%' }, { attributeName: '暴击伤害', attributeValue: '16.8%' }] },
              { roleId: 1002, roleName: '安可', roleIconUrl: '', phantomName: '无冠者', phantomIconUrl: '', level: 25, cost: 4, fetterName: '熔山裂谷', mainProps: [{ attributeName: '攻击', attributeValue: '352' }], subProps: [{ attributeName: '暴击率', attributeValue: '6.3%' }] },
              { roleId: 1001, roleName: '吟霖', roleIconUrl: '', phantomName: '融火虫', phantomIconUrl: '', level: 20, cost: 3, fetterName: '凝夜白霜', mainProps: [{ attributeName: '攻击%', attributeValue: '30%' }], subProps: [] }
            ],
            page: 1,
            totalPages: 1
          }}
        />
      )
    },
    '/pool': {
      component: (
        <PoolCard
          data={{
            pools: [
              { title: '限定角色调谐 — 吟霖', publishTime: '2026-03-20 10:00' },
              { title: '限定武器调谐 — 苍鳞千嶂', publishTime: '2026-03-20 10:00' },
              { title: '角色常驻调谐', publishTime: '2026-03-01 06:00' }
            ]
          }}
        />
      )
    }
  }
});

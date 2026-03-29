import ExploreCard from '@src/img/views/ExploreCard';
import WuwaHelp from '@src/img/views/Help';
import RoleInfoCard from '@src/img/views/RoleInfoCard';
import SignCard from '@src/img/views/SignCard';
import StaminaCard from '@src/img/views/StaminaCard';
import TowerCard from '@src/img/views/TowerCard';
import { defineConfig } from 'jsxp';
import React from 'react';

export default defineConfig({
  routes: {
    '/wuwa-help': {
      component: <WuwaHelp />
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
                  areaId: 1,
                  areaName: '中曲台地',
                  areaProgress: 85,
                  itemList: [
                    { type: 'chest', name: '宝箱', progress: 42, total: 50 },
                    { type: 'viewpoint', name: '景点', progress: 8, total: 10 }
                  ]
                },
                {
                  areaId: 2,
                  areaName: '荒石高地',
                  areaProgress: 62,
                  itemList: [
                    { type: 'chest', name: '宝箱', progress: 30, total: 48 },
                    { type: 'viewpoint', name: '景点', progress: 5, total: 8 }
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
                      areaName: '第一区',
                      maxStar: 9,
                      star: 9,
                      floorList: [
                        { floorName: '第1层', star: 3, maxStar: 3, roleList: [] },
                        { floorName: '第2层', star: 3, maxStar: 3, roleList: [] },
                        { floorName: '第3层', star: 3, maxStar: 3, roleList: [] }
                      ]
                    }
                  ]
                }
              ]
            }
          }}
        />
      )
    }
  }
});

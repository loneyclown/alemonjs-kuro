import { defineConfig } from 'jsxp';
// 自动批量引入 views 下所有 json 和 html 组件
import CkHelpCard from '@src/img/views/CkHelpCard';
import MihoyoHelp from '@src/img/views/MihoyoHelp';
import React from 'react';

export default defineConfig({
  routes: {
    '/mihoyo-help': {
      component: <MihoyoHelp />
    },
    '/ck-help': {
      component: <CkHelpCard />
    }
  }
});

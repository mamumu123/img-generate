import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  // history: {
  //   type: 'hash'
  // },
  initialState: {},
  base: '/img-generate/',
  publicPath: '/img-generate/',
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home',
    // },
    {
      name: '头像拼接',
      path: '/',
      component: './',
    },

    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
    { component: '@/pages/' },
  ],
  analytics: {
    baidu: 'e4ec5f782f5d1d99801021aff8419db7',
  },
  npmClient: 'pnpm',
});

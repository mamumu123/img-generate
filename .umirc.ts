import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  base: '/img-generate/',
  publicPath: '/img-generate/',
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '头像拼接',
      path: '/home',
      component: './Home',
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
  ],
  analytics: {
    baidu: '14318f32f234fe5474f03e94303b7af6',
  },
  npmClient: 'pnpm',
});

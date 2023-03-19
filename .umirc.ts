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
    {
      name: '头像拼接',
      path: '/',
      component: './',
    },
    {
      name: '节日氛围',
      path: '/flower',
      component: './flower',
    },
    {
      name: '颜色选取',
      path: '/color',
      component: './color',
    },

    { component: '@/pages/' },
  ],
  analytics: {
    baidu: 'e4ec5f782f5d1d99801021aff8419db7',
  },
  npmClient: 'pnpm',
});

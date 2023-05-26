import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  // history: {
  //   type: 'hash'
  // },
  initialState: {},
  base: process.env.PUBLIC_PATH || '/',
  publicPath: process.env.PUBLIC_PATH || '/',
  request: {},
  layout: {
    title: '工具中心',
  },
  routes: [
    {
      path: '/',
      redirect: '/cut',
    },
    {
      name: '图像处理',
      path: '/cut',
      component: './cut',
    },
    {
      name: '头像拼接',
      path: '/avatar',
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
    {
      name: '三原色',
      path: '/red',
      component: './RGBColorPicker',
    },

    { component: '@/pages/' },
  ],
  analytics: {
    baidu: 'e4ec5f782f5d1d99801021aff8419db7',
  },
  npmClient: 'pnpm',
});

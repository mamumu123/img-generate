import { defineConfig } from '@umijs/max';

const isDEV = process.env.NODE_ENV !== 'development';

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
    title: '工具中心',
  },
  define: {
    IS_ENV_DEVELOPMENT: isDEV,
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
      name: '音视频工具',
      path: '/videoCut',
      component: './videoCut',
      hide: !isDEV,
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
    {
      name: '上传',
      path: '/upload',
      component: './videoCut/components/FileUpload',
      hide: !isDEV,
    },
    { component: '@/pages/' },
  ],
  analytics: {
    baidu: 'e4ec5f782f5d1d99801021aff8419db7',
  },
  npmClient: 'yarn',
  metas: [
    {
      httpEquiv: 'origin-trial',
      content:
        'Ahnv7FGao2cq+C3jTDLwV+C9cYehRObod7bjy9naBzPnxQasGZDFPSLunyOa8a47x+15DqM3VSHh8z5SH75rPgoAAAB9eyJvcmlnaW4iOiJodHRwczovL21hbXVtdTEyMy5naXRodWIuaW86NDQzIiwiZmVhdHVyZSI6IlVucmVzdHJpY3RlZFNoYXJlZEFycmF5QnVmZmVyIiwiZXhwaXJ5IjoxNzA5ODU1OTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=',
    },
  ],
});

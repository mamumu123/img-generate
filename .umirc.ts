import { defineConfig } from '@umijs/max';

const isDEV = process.env.NODE_ENV === 'development';

const routes = [
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
    component: '@/layouts/index',
    routes: [
      {
        name: '工具',
        component: './videoCut',
        path: '/videoCut/videoCut',
      },
      {
        name: '上传',
        path: '/videoCut/upload',
        component: './videoCut/components/FileUpload',
      },
      {
        name: 'ffmpeg',
        path: '/videoCut/ffmpeg',
        component: './videoCut/views/ffmpeg',
      },
      {
        name: '轨道',
        path: '/videoCut/track',
        component: './videoCut/views/track',
      },
    ],
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
].filter((item) => item.hide !== true)

export default defineConfig({
  antd: {

  },
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
  define: {
    IS_ENV_DEVELOPMENT: isDEV,
  },
  routes,
  analytics: {
    baidu: 'e4ec5f782f5d1d99801021aff8419db7',
  },
  esbuildMinifyIIFE: true,
  npmClient: 'yarn',
  metas: [
    {
      httpEquiv: 'origin-trial',
      content:
        'Ahnv7FGao2cq+C3jTDLwV+C9cYehRObod7bjy9naBzPnxQasGZDFPSLunyOa8a47x+15DqM3VSHh8z5SH75rPgoAAAB9eyJvcmlnaW4iOiJodHRwczovL21hbXVtdTEyMy5naXRodWIuaW86NDQzIiwiZmVhdHVyZSI6IlVucmVzdHJpY3RlZFNoYXJlZEFycmF5QnVmZmVyIiwiZXhwaXJ5IjoxNzA5ODU1OTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0=',
    },
  ],
  headScripts: [{ src: './mini-coi.js' }]
});

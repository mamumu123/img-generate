import {
  toRed,
  toGreen,
  toBlue,
  flipUpsideDown,
  flipSideToSide,
  toGrey,
  toBlackAndWhite,
  sharpen,
  marginSharpen,
  toGaussianBlur,
} from '@/utils/imageUtil';

export const LENA_PATH =
  'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69b1afc1723c4233ba09e37c845973f1~tplv-k3u1fbpfcp-watermark.image';

export const OP = {
  toRed: 'toRed',
  toGreen: 'toGreen',
  toBlue: 'toBlue',
  flipUpsideDown: 'flipUpsideDown',
  flipSideToSide: 'flipSideToSide',
  leftRotate: 'leftRotate',
  rightRotate: 'rightRotate',
  toGrey: 'toGrey',
  toBlackAndWhite: 'toBlackAndWhite',
  sharpen: 'sharpen',
  marginSharpen: 'marginSharpen',
  toGaussianBlur: 'toGaussianBlur',
  reset: 'reset',
};

export const methodList = {
  toRed,
  toGreen,
  toBlue,
  flipUpsideDown,
  flipSideToSide,
  toGrey,
  toBlackAndWhite,
  sharpen,
  marginSharpen,
  toGaussianBlur,
};

export const OP_OPTIONS = [
  {
    key: OP.toRed,
    label: '红色滤镜',
  },
  {
    key: OP.toGreen,
    label: '绿色滤镜',
  },
  {
    key: OP.toBlue,
    label: '蓝色滤镜',
  },
  // {
  //   key: OP.toGaussianBlur,
  //   label: '高斯模糊',
  // },
  {
    key: OP.marginSharpen,
    label: '边缘锐化',
  },
  {
    key: OP.sharpen,
    label: '锐化',
  },
  {
    key: OP.toBlackAndWhite,
    label: '黑白化',
  },
  {
    key: OP.toGrey,
    label: '灰化',
  },
  {
    key: OP.flipSideToSide,
    label: '左右翻转',
  },
  {
    key: OP.flipUpsideDown,
    label: '上下翻转',
  },
];

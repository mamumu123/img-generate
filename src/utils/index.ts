import { keyImg, TAB_KEY_LIST, TRAITS } from '@/constants/traits';
import _ from 'ts-lodash';

export const loadImage: (src: string) => Promise<CanvasImageSource> = (
  src: string,
) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(null);
    img.src = src;
  });

export function isWeChat() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

export const getInitSelect = () => ({
  Faxing: '',
  Yanjing: '',
  Bizi: '',
  Zuiba: '',
  Mianbuzhuangshi: '',
  Yanbuzhuangshi: '',
});

interface II {
  Faxing: string;
  Yanjing: string;
  Bizi: string;
  Zuiba: string;
  Mianbuzhuangshi: string;
  Yanbuzhuangshi: string;
}

export function getRandomTraits() {
  let randomTraits: II = getInitSelect();
  TAB_KEY_LIST.forEach((traitKey: keyImg) => {
    const tabVal = TRAITS[traitKey];
    randomTraits[traitKey] = (_.sample(tabVal) as any).key;
  });

  const randomPercentage = Math.floor(Math.random() * 100);
  console.log('randomPercentage: ', randomPercentage);

  if (randomPercentage < 80) {
    randomTraits.Yanbuzhuangshi = '';
  }

  if (randomPercentage < 60) {
    randomTraits.Mianbuzhuangshi = '';
  }

  if (randomTraits['Mianbuzhuangshi'] === 'Huzi') {
    randomTraits['Bizi'] = '';
    randomTraits['Zuiba'] = '';
  }
  if (randomTraits['Yanbuzhuangshi'] === 'Mojing') {
    randomTraits['Yanjing'] = '';
  }

  console.log('randomTraits: ', randomTraits);

  return randomTraits;
}

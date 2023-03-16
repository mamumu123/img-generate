export const NATIONAL_IMG = {
  national: [
    {
      key: 'ah2',
      img: 'date/ten/ah2.png',
    },
    {
      key: 'ah3',
      img: 'date/ten/ah3.png',
    },
    {
      key: 'ah4',
      img: 'date/ten/ah4.png',
    },
    {
      key: 'ah5',
      img: 'date/ten/ah5.png',
    },
    {
      key: 'ah6',
      img: 'date/ten/ah6.png',
    },
    {
      key: 'ah8',
      img: 'date/ten/ah8.png',
    },
    {
      key: 'ah10',
      img: 'date/ten/ah10.png',
    },
  ],
};

export const TAB_KEY_LIST_NATIONAL_IMG = Object.keys(NATIONAL_IMG) as [
  keyof typeof NATIONAL_IMG,
];
export const TAB_LABEL = {
  national: '国庆',
};

export type keyImg = keyof typeof NATIONAL_IMG;

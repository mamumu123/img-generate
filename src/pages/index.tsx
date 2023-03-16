import { TAB_KEY_LIST, TAB_LABEL, TRAITS, keyImg } from '@/constants/traits';
import { loadImage, getRandomTraits } from '@/utils';
import { download } from '@/utils/download';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, Row, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 选择的图片，用来拼接
  const [imgSelect, setImgSelect] = useState({
    Faxing: '',
    Yanjing: '',
    Bizi: '',
    Zuiba: '',
    Mianbuzhuangshi: '',
    Yanbuzhuangshi: '',
  });

  // 进行动态渲染
  useEffect(() => {
    (async () => {
      if (!canvasRef.current) {
        return;
      }
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        return;
      }

      const images = ['traits/Lian.jpg'];

      ctx?.clearRect(0, 0, 200, 200);
      ctx.beginPath();
      ctx.rect(0, 0, 200, 200);
      ctx.fillStyle = '#fff';
      ctx.fill();

      TAB_KEY_LIST.forEach((tab: keyImg) => {
        let result = '';
        const isSelect = imgSelect[tab];
        if (isSelect) {
          result =
            TRAITS[tab].find((item) => item.key === imgSelect[tab])?.img || '';
          images.push(result);
        }
      });

      images.push(
        images.splice(
          images.findIndex((img) => img.includes('Faxing')),
          1,
        )[0],
      );

      const imagesObj = await Promise.all(images.map(loadImage));
      imagesObj.forEach((item) => {
        ctx?.drawImage(item, 0, 0, 200, 200);
      });
    })();
  }, [imgSelect]);

  const onClickImg = (tab: keyImg, it: string) => {
    setImgSelect((per) => ({
      ...per,
      [tab]: it,
    }));
  };

  console.log(imgSelect);

  const items = TAB_KEY_LIST.map((tab) => ({
    key: tab,
    label: TAB_LABEL[tab],
    children: (
      <Row>
        {TRAITS[tab].map((it) => (
          <Col span={8} key={it.key}>
            <div
              className={styles.img__container}
              onClick={() => onClickImg(tab, it.key)}
              style={{
                cursor: 'pointer',
                borderRadius: 5,
                border: `2px solid ${
                  imgSelect[tab] === it.key ? 'yellowgreen' : '#000'
                }  `,
              }}
            >
              <img src={it.img} alt="" />
            </div>
          </Col>
        ))}
      </Row>
    ),
  }));

  const [currentTab, setCurrentTab] = useState<keyImg>('Faxing');

  const onChange = (tab: string) => {
    console.log('currentTab', currentTab, 'tab', tab);
    setCurrentTab(tab as keyImg);
  };

  const left = () => {
    return (
      <div className={styles.left}>
        <Tabs
          tabPosition="left"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    );
  };

  const right = () => {
    return (
      <div className={styles.right}>
        <div>
          <canvas id="canvas" ref={canvasRef} width="200" height="200"></canvas>
        </div>
        <div className={styles.button__box}>
          <Button
            size="small"
            type="primary"
            onClick={() => download(canvasRef)}
          >
            下载头像
          </Button>
          <Button
            size="small"
            onClick={async () => {
              setImgSelect(getRandomTraits());
            }}
          >
            随机生成
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {left()}
        {right()}
      </div>
    </PageContainer>
  );
};

export default HomePage;

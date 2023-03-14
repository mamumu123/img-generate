import { TAB_KEY_LIST, TAB_LABEL, TRAITS, keyImg } from '@/constants/traits';
import { isWeChat, loadImage, getRandomTraits } from '@/utils';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, message, Row, Tabs } from 'antd';
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
            onClick={async () => {
              if (isWeChat()) {
                message.info({
                  content:
                    '由于微信浏览器的限制，无法下载图片，请【长摁头像保存为图片】或者右上角用系统浏览器打开使用，谢谢。',
                });
              } else {
                const canvas = canvasRef.current;
                // 创建一个 a 标签，并设置 href 和 download 属性
                const el = document.createElement('a');
                // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
                if (!canvas) {
                  message.error('遇到一些问题，请稍后再试');
                  return;
                }
                el.href = canvas.toDataURL();
                el.download = '文件名称';

                // 创建一个点击事件并对 a 标签进行触发
                const event = new MouseEvent('click');
                el.dispatchEvent(event);
              }
            }}
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

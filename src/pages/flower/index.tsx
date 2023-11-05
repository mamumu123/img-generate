import {
  TAB_KEY_LIST_NATIONAL_IMG,
  TAB_LABEL,
  NATIONAL_IMG,
  keyImg,
} from '@/constants/ornament';
import { download } from '@/utils/download';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Col, message, Row, Tabs, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { getBase64 } from './utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { loadImage } from '@/utils';

const HomePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 选择的图片，用来拼接
  const [imgSelect, setImgSelect] = useState('');

  // 用户头像
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    setLoading(true);

    getBase64(file, (url) => {
      setLoading(false);
      setImageUrl(url);
    });

    return false;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  );

  // // 进行动态渲染
  useEffect(() => {
    (async () => {
      if (!canvasRef.current) {
        return;
      }
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx?.clearRect(0, 0, 200, 200);
      ctx.beginPath();
      ctx.rect(0, 0, 200, 200);
      ctx.fillStyle = '#fff';
      ctx.fill();
      const images = [imageUrl, imgSelect].filter((i) => !!i);
      const imagesObj = await Promise.all(images.map(loadImage));
      imagesObj.forEach((item) => {
        ctx?.drawImage(item, 0, 0, 200, 200);
      });
    })();
  }, [imgSelect, imageUrl]);

  const onClickImg = (tab: keyImg, it: string) => {
    setImgSelect(it);
  };

  const items = TAB_KEY_LIST_NATIONAL_IMG.map((tab) => ({
    key: tab,
    label: TAB_LABEL[tab],
    children: (
      <Row>
        {NATIONAL_IMG[tab].map((it) => (
          <Col span={8} key={it.key}>
            <div
              className={styles.img__container}
              onClick={() => onClickImg(tab, it.img)}
              style={{
                cursor: 'pointer',
                borderRadius: 5,
                border: `2px solid ${imgSelect === it.key ? 'yellowgreen' : '#000'
                  }  `,
              }}
            >
              <img crossOrigin='anonymous' src={it.img} alt="" />
            </div>
          </Col>
        ))}
      </Row>
    ),
  }));

  const [currentTab, setCurrentTab] = useState<keyImg>('national');

  const onChange = (tab: string) => {
    console.log('currentTab', currentTab);
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
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          {imageUrl ? (
            <img crossOrigin='anonymous' src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
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

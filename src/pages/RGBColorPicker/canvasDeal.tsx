import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.less';
import { useLocalStorageState } from 'ahooks';
import { getImageSize } from '@/utils/image';
import { loadImage } from '@/utils';

const LENA_PATH = 'https://upload.wikimedia.org/wikipedia/zh/3/34/Lenna.jpg';

function ColorGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newCanvasRef = useRef<HTMLCanvasElement>(null);

  const [newData, setNewData] = useState<ImageData | null>();

  const [url, setUrl] = useLocalStorageState<string>('url', {
    defaultValue: LENA_PATH,
  });
  console.log('url', url);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !url) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    getImageSize(url)
      .then(async ({ width, height }) => {
        canvas.width = width;
        canvas.height = height;
        const data = await loadImage(url);
        ctx.drawImage(data, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        setNewData(imageData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  useEffect(() => {
    const canvas = newCanvasRef.current;
    if (!canvas || !url) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    if (newData) {
      canvas.width = newData.width;
      canvas.height = newData.height;
      ctx.putImageData(newData, 0, 0);
    }
  }, [newData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);

    // TODO:
    setUrl(LENA_PATH);
  };

  return (
    <PageContainer>
      <div className={styles.container}>
        <Row>
          <Col span={12}>
            <canvas ref={canvasRef} />
          </Col>
          <Col span={12}>
            url:
            <Input value={url || LENA_PATH} onChange={handleChange} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>
            <canvas ref={newCanvasRef} />
          </Col>
        </Row>
      </div>
    </PageContainer>

    // <div>
    //   <canvas ref={canvasRef} />
    //   {/* <canvas ref={newCanvasRef} /> */}
    // </div>
  );
}

export default ColorGrid;

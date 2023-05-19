import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Input, Checkbox } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.less';
import { useLocalStorageState } from 'ahooks';
import { getImageSize } from '@/utils/image';
import { loadImage } from '@/utils';
import { toRed, toGreen, toBlue } from '@/utils/imageUtil';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const LENA_PATH = 'https://upload.wikimedia.org/wikipedia/zh/3/34/Lenna.jpg';

const OP = {
  redFilter: 'redFilter',
  greenFilter: 'greenFilter',
  blurFilter: 'blurFilter',
};

function ColorGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newCanvasRef = useRef<HTMLCanvasElement>(null);

  const [newData, setNewData] = useState<ImageData | null>();

  const [oldData, setOldData] = useState<ImageData | null>();

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
        setOldData(imageData);
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

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    const canvas = canvasRef.current;
    if (!canvas || !url || !oldData) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const { width, height } = oldData;
    let nData: ImageData | null = oldData;
    const imageData = ctx.getImageData(0, 0, width, height);

    if (checkedValues.includes(OP.redFilter)) {
      nData = toRed(imageData);
    }

    if (checkedValues.includes(OP.greenFilter)) {
      nData = toGreen(imageData);
    }

    if (checkedValues.includes(OP.blurFilter)) {
      nData = toBlue(imageData);
    }
    setNewData(nData);
  };

  return (
    <PageContainer>
      <div className={styles.container}>
        <Row>
          <Col span={12} className={styles.block__container}>
            <canvas ref={canvasRef} />
          </Col>
          <Col span={12} className={styles.block__container}>
            url:
            <Input value={url || LENA_PATH} onChange={handleChange} />
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
              <Row>
                <Col span={8}>
                  <Checkbox value={OP.redFilter}>红色滤镜</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={OP.greenFilter}>绿色滤镜</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={OP.blurFilter}>蓝色滤镜</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D">D</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E">E</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12} className={styles.block__container}>
            col-12
          </Col>
          <Col span={12} className={styles.block__container}>
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

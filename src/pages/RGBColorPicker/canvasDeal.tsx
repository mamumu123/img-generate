import { PageContainer } from '@ant-design/pro-components';
import { Col, Row, Input, Checkbox, Card, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.less';
import { useLocalStorageState } from 'ahooks';
import { getImageSize } from '@/utils/image';
import { loadImage } from '@/utils';
import {
  toRed,
  toGreen,
  toBlue,
  flipUpsideDown,
  flipSideToSide,
  leftRotate,
  rightRotate,
} from '@/utils/imageUtil';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { download } from '@/utils/download';

const LENA_PATH = 'https://upload.wikimedia.org/wikipedia/zh/3/34/Lenna.jpg';

const OP = {
  redFilter: 'redFilter',
  greenFilter: 'greenFilter',
  blurFilter: 'blurFilter',
  flipUpsideDown: 'flipUpsideDown',
  flipSideToSide: 'flipSideToSide',
  leftRotate: 'leftRotate',
  rightRotate: 'rightRotate',
};

function ColorGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newCanvasRef = useRef<HTMLCanvasElement>(null);

  const [newData, setNewData] = useState<ImageData | null>();
  console.log('newData', newData);

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

  // 这里返回一个数组，每个数组中的值都是一个效果；是一个结果
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
    let nData: ImageData | null = oldData;

    // TODO: 名字一致，直接调用
    if (checkedValues.includes(OP.redFilter)) {
      nData = toRed(nData);
    }

    if (checkedValues.includes(OP.greenFilter)) {
      nData = toGreen(nData!);
    }

    if (checkedValues.includes(OP.blurFilter)) {
      nData = toBlue(nData!);
    }

    if (checkedValues.includes(OP.blurFilter)) {
      nData = toBlue(nData!);
    }

    if (checkedValues.includes(OP.blurFilter)) {
      nData = toBlue(nData!);
    }

    if (checkedValues.includes(OP.flipSideToSide)) {
      nData = flipSideToSide(nData!);
    }

    if (checkedValues.includes(OP.flipUpsideDown)) {
      nData = flipUpsideDown(nData!);
    }

    setNewData(nData);
  };

  // 这里是每次都会触发一个操作，是一个动作；
  const perChange = (op: string) => {
    const canvas = newCanvasRef.current;
    if (!canvas || !url || !newData) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    let nData: ImageData | null = newData;

    if (op === OP.leftRotate) {
      nData = leftRotate(nData!);
    }
    if (op === OP.rightRotate) {
      nData = rightRotate(nData!);
    }
    setNewData(nData);
  };

  return (
    <PageContainer>
      <div className={styles.container}>
        <Row className={styles.row__container}>
          <Col span={12} className={styles.block__container}>
            <canvas ref={canvasRef} />
          </Col>
          <Col span={12} className={styles.block__container}>
            url:
            <Input value={url || LENA_PATH} onChange={handleChange} />
            <Card>
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
                    <Checkbox value={OP.flipSideToSide}>左右翻转</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={OP.flipUpsideDown}>上下翻转</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Card>
            <Card>
              <Button onClick={() => perChange(OP.leftRotate)}>向左旋转</Button>
              <Button onClick={() => perChange(OP.rightRotate)}>
                向右旋转
              </Button>
            </Card>
            <Card>
              <Button onClick={() => download(newCanvasRef)}>下载</Button>
            </Card>
          </Col>
        </Row>
        <Row className={styles.row__container}>
          <Col span={12} className={styles.block__container}></Col>
          <Col span={12} className={styles.block__container}>
            <canvas ref={newCanvasRef} />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
}

export default ColorGrid;

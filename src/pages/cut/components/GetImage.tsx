import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { LENA_PATH } from '../constant';

interface IGetImage {
  url: string;
  setUrl: any;
}

export const GetImage = ({ url, setUrl }: IGetImage) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl?.(e.target.value || LENA_PATH);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const propsUpload: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  useEffect(() => {
    const file = fileList[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = function (event) {
      setUrl(event.target?.result);
    };
    reader.readAsDataURL(file as any);
  }, [fileList]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Upload {...propsUpload}>
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>

        <Input value={url || LENA_PATH} onChange={handleChange} allowClear />
      </div>
    </>
  );
};

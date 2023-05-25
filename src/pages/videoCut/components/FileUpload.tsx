import React from 'react';
import { dbFileDexie as db } from '@/db'
import { Button } from 'antd';
import { useModel } from '@umijs/max';
import { sizeTostr } from '@/utils/imageUtil';

function FileUpload() {

    const { media } = useModel('video')

    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                db.files.put({ name: file.name, type: file.type, data: file })
            } catch (error) {
                console.error('handleMediaChange error', error)
            }
        };
    }

    const handleMediaDel = () => {
        if (media && db) {
            db.files.delete(media.id!)
        }
    };

    return (
        <div>
            {media ? (
                <div>
                    <p>文件名：{media.name}</p>
                    <p>文件类型：{media.type}</p>
                    <p>文件大小：{sizeTostr(media.data.size)}</p>
                    <Button onClick={handleMediaDel}>清除文件</Button>
                </div>
            ) : (
                <div>
                    <input type="file" onChange={handleMediaChange} />
                </div>
            )}
        </div>
    );
}

export default FileUpload;
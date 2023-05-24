import React, { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { dbFileDexie as db } from '@/db'
import { Button } from 'antd';

function FileUpload() {

    const mediaList = useLiveQuery(
        () => db.files?.toArray?.()
    );

    // TODO: 目前仅仅支持上传一个文件
    const media = useMemo(() => mediaList?.length ? mediaList[0] : null, [mediaList])

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
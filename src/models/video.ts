import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { dbFileDexie as db } from '@/db'

const useVideoData = () => {

    const mediaList = useLiveQuery(
        () => db.files?.toArray?.()
    );

    // TODO: 目前仅仅支持上传一个文件
    const media = useMemo(() => mediaList?.length ? mediaList[0] : null, [mediaList])

    return {
        media,
    };
};

export default useVideoData;

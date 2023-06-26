import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react';
import { dbFileDexie as db } from '@/db'

const useVideoData = () => {

    const mediaList = useLiveQuery(
        () => db.files?.toArray?.()
    );

    // TODO: 目前仅仅支持上传一个文件
    const media = useMemo(() => mediaList?.length ? mediaList[0] : null, [mediaList])

    const mediaType = useMemo(() => media?.type ?? '', [media]);
    const mediaFile = useMemo(() => media?.data ?? null, [media]);
    const mediaName = useMemo(() => media?.name ?? null, [media]);

    const [videoCurrentTime, setVideoCurrentTime] = useState(0);


    return {
        media,
        mediaType,
        mediaFile,
        mediaName,
        videoCurrentTime,
        setVideoCurrentTime,
    };
};

export default useVideoData;

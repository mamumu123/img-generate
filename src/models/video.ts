import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { dbFileDexie as db } from '@/db'

const useVideoData = () => {

    const mediaList = useLiveQuery(
        () => db.files?.toArray?.()
    );

    // TODO: 目前仅仅支持上传一个文件
    const media = useMemo(() => mediaList?.length ? mediaList[0] : null, [mediaList])

    const mediaType = useMemo(() => media?.type ?? '', [media])
    const mediaFile = useMemo(() => media?.data ?? null, [media])
    const mediaName = useMemo(() => media?.name ?? null, [media])


    return {
        media,
        mediaType,
        mediaFile,
        mediaName,
    };
};

export default useVideoData;

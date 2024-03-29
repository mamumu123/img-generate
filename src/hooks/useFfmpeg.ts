import { useEffect, useMemo, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';

export const useFfmpeg = (ffmpeg: FFmpeg) => {
  const [stderr, setStderr] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      ffmpeg.setProgress((ev) => {
        const { ratio } = ev;
        console.log('[progress]', ev);

        if (ratio >= 0 && ratio <= 1) {
          setProgress(ratio * 100);
        }
        if (ratio === 1) {
          setTimeout(() => {
            setProgress(0);
          }, 1000);
        }
      });

      ffmpeg.setLogger(({ type, message }) => {
        switch (type) {
          case 'fferr':
            setStderr((v) => [...v, message]);
            return;
        }
      });
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      setIsLoaded(true);
    })();
  }, []);

  return {
    stderr,
    setStderr,
    progress,
    ffmpegIsLoaded: isLoaded,
  };
};

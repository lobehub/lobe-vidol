import dayjs from 'dayjs';
import { domToJpeg, domToPng, domToSvg, domToWebp } from 'modern-screenshot';
import { useCallback, useState } from 'react';

import { ImageType } from '@/app/chat/ChatHeader/actions/ShareButton/type';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';

export const useScreenshot = (imageType: ImageType, selector: string) => {
  const [loading, setLoading] = useState(false);
  const currentAgent = useSessionStore(sessionSelectors.currentAgent);
  const title = currentAgent?.meta?.name;

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      let screenshotFn: any;
      switch (imageType) {
        case ImageType.JPG: {
          screenshotFn = domToJpeg;
          break;
        }
        case ImageType.PNG: {
          screenshotFn = domToPng;
          break;
        }
        case ImageType.SVG: {
          screenshotFn = domToSvg;
          break;
        }
        case ImageType.WEBP: {
          screenshotFn = domToWebp;
          break;
        }
      }

      const dataUrl = await screenshotFn(document.querySelector(selector) as HTMLDivElement, {
        features: {
          // 不启用移除控制符，否则会导致 safari emoji 报错
          removeControlCharacter: false,
        },
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `LobeVidol_${title}_${dayjs().format('YYYY-MM-DD')}.${imageType}`;
      link.href = dataUrl;
      link.click();
      setLoading(false);
    } catch (error) {
      console.error('Failed to download image', error);
      setLoading(false);
    }
  }, [imageType, title]);

  return {
    loading,
    onDownload: handleDownload,
    title,
  };
};

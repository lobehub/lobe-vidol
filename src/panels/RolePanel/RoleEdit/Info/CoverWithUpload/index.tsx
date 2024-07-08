import { Upload } from 'antd';
import React, { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyGuide from '@/components/EmptyGuide';
import HolographicCard from '@/components/HolographicCard';
import {
  COVER_COMPRESS_HEIGHT,
  COVER_COMPRESS_WIDTH,
  COVER_IMAGE_HEIGHT,
  COVER_IMAGE_WIDTH,
} from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { createUploadImageHandler } from '@/utils/common';
import { coverImageToBase64 } from '@/utils/imageToBase64';

interface CoverWithUploadProps {
  compressSize?: {
    height: number;
    width: number;
  };
  size?: {
    height: number;
    width: number;
  };
  style?: CSSProperties;
}

const CoverWithUpload = memo<CoverWithUploadProps>(
  ({
    compressSize = { height: COVER_COMPRESS_HEIGHT, width: COVER_COMPRESS_WIDTH },
    style,
    size = { height: COVER_IMAGE_HEIGHT, width: COVER_IMAGE_WIDTH },
  }) => {
    const [meta, updateAgentMeta] = useAgentStore((s) => [
      agentSelectors.currentAgentMeta(s),
      s.updateAgentMeta,
    ]);

    const handleUploadAvatar = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          const webpBase64 = coverImageToBase64({ img, size: compressSize });
          updateAgentMeta({ cover: webpBase64 });
        });
      }),
      [],
    );
    const { t } = useTranslation('panel');

    return (
      <div style={{ height: size.height, width: size.width, ...style }}>
        <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
          {meta?.cover ? (
            <HolographicCard img={meta.cover} />
          ) : (
            <EmptyGuide
              size={size}
              extra={t('role.uploadSize', { width: size.width, height: size.height })}
            />
          )}
        </Upload>
      </div>
    );
  },
);

export default CoverWithUpload;

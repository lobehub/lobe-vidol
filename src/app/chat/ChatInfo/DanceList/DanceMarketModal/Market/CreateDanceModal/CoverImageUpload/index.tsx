import { Upload } from 'antd';
import { createStyles } from 'antd-style';
import NextImage from 'next/image';
import React, { memo, useCallback } from 'react';

import {
  COVER_COMPRESS_SIZE,
  DANCE_COVER_IMAGE_SIZE,
  DEFAULT_AGENT_AVATAR_URL,
} from '@/constants/common';
import { createUploadImageHandler } from '@/utils/common';
import { imageToBase64 } from '@/utils/imageToBase64';

const useStyles = createStyles(
  ({ css, token }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 8px;
    transition:
      scale 400ms ${token.motionEaseOut},
      box-shadow 100ms ${token.motionEaseOut};

    &:hover {
      box-shadow: 0 0 0 3px ${token.colorPrimary};
    }

    &:active {
      scale: 0.98;
    }
  `,
);

interface CoverImageUploadProps {
  onChange?: (value: string) => void;
  size?: number;
  value?: string;
}

const CoverImageUpload = memo<CoverImageUploadProps>(
  ({ value, onChange, size = DANCE_COVER_IMAGE_SIZE }) => {
    const { styles } = useStyles();

    const handleUploadCover = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          const cover = imageToBase64({ img, size: COVER_COMPRESS_SIZE });
          onChange?.(cover);
        });
      }),
      [onChange],
    );

    return (
      <div className={styles} style={{ width: size, height: size }}>
        <Upload beforeUpload={handleUploadCover} itemRender={() => void 0} maxCount={1}>
          <NextImage
            alt="Cover Image"
            height={size}
            src={value || DEFAULT_AGENT_AVATAR_URL}
            unoptimized
            width={size}
          />
        </Upload>
      </div>
    );
  },
);

export default CoverImageUpload;

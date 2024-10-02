import { Button, Upload } from 'antd';
import { createStyles } from 'antd-style';
import { PlusCircle } from 'lucide-react';
import NextImage from 'next/image';
import React, { CSSProperties, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { COVER_COMPRESS_SIZE, DANCE_COMPRESS_SIZE, DANCE_IMAGE_SIZE } from '@/constants/common';
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

interface CoverValue {
  cover: string;
  thumb: string;
}

interface CoverImageUploadProps {
  className?: string;
  onChange?: (value: CoverValue) => void;
  size?: number;
  style?: CSSProperties;
  value?: CoverValue;
}

const CoverImageUpload = memo<CoverImageUploadProps>(
  ({ value, onChange, size = DANCE_IMAGE_SIZE, className, style }) => {
    const { t } = useTranslation('dance');
    const { styles } = useStyles();

    const handleUploadCover = useCallback(
      createUploadImageHandler((avatar) => {
        const img = new Image();
        img.src = avatar;
        img.addEventListener('load', () => {
          // 统一转成压缩过的 base64 图像文件。
          const cover = imageToBase64({ img, size: COVER_COMPRESS_SIZE });
          const thumb = imageToBase64({ img, size: DANCE_COMPRESS_SIZE });
          onChange?.({ thumb, cover });
        });
      }),
      [onChange],
    );

    return (
      <Upload
        beforeUpload={handleUploadCover}
        itemRender={() => void 0}
        maxCount={1}
        accept="image/*"
        className={className}
        style={style}
      >
        {value?.cover ? (
          <NextImage
            alt="Cover Image"
            height={size}
            src={value.cover}
            unoptimized
            width={size}
            className={styles}
          />
        ) : (
          <Button icon={<PlusCircle />}>{t('create.image.upload')}</Button>
        )}
      </Upload>
    );
  },
);

export default CoverImageUpload;

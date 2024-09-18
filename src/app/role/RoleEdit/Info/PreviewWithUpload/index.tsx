import { Upload } from 'antd';
import { createStyles } from 'antd-style';
import NextImage from 'next/image';
import React, { CSSProperties, memo, useCallback } from 'react';

import {
  AVATAR_COMPRESS_SIZE,
  AVATAR_IMAGE_SIZE,
  COVER_COMPRESS_SIZE,
  DEFAULT_AGENT_AVATAR_URL,
} from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { createUploadImageHandler } from '@/utils/common';
import { imageToBase64 } from '@/utils/imageToBase64';

const useStyle = createStyles(
  ({ css, token }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    transition:
      scale 400ms ${token.motionEaseOut},
      box-shadow 100ms ${token.motionEaseOut};

    &:hover {
      box-shadow: 0 0 0 3px ${token.colorText};
    }

    &:active {
      scale: 0.8;
    }
  `,
);

interface AvatarWithUploadProps {
  id?: string;
  size?: number;
  style?: CSSProperties;
}

export default memo<AvatarWithUploadProps>(({ size = AVATAR_IMAGE_SIZE, style, id }) => {
  const { styles } = useStyle();
  const [avatar, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s)?.avatar,
    s.updateAgentMeta,
  ]);

  const handleUploadAvatar = useCallback(
    createUploadImageHandler((avatar) => {
      const img = new Image();
      img.src = avatar;
      img.addEventListener('load', () => {
        const avatar = imageToBase64({ img, size: AVATAR_COMPRESS_SIZE });
        const cover = imageToBase64({ img, size: COVER_COMPRESS_SIZE });
        updateAgentMeta({ avatar, cover });
      });
    }),
    [],
  );

  return (
    <div
      className={styles}
      id={id}
      style={{ maxHeight: AVATAR_IMAGE_SIZE, maxWidth: AVATAR_IMAGE_SIZE, ...style }}
    >
      <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
        <NextImage
          alt={avatar ? 'userAvatar' : 'LobeVidol'}
          height={size}
          src={!!avatar ? avatar : DEFAULT_AGENT_AVATAR_URL}
          unoptimized
          width={size}
        />
      </Upload>
    </div>
  );
});

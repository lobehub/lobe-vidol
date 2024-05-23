import { Upload } from 'antd';
import { memo, useCallback } from 'react';

import Avatar from '@/components/Avatar';
import { AVATAR_COMPRESS_SIZE, AVATAR_IMAGE_SIZE } from '@/constants/common';
import { useSettingStore } from '@/store/setting';
import { createUploadImageHandler } from '@/utils/common';
import { imageToBase64 } from '@/utils/imageToBase64';

const AvatarWithUpload = memo(() => {
  const [avatar, setAvatar] = useSettingStore((s) => [s.config.avatar, s.setAvatar]);

  const handleUploadAvatar = useCallback(
    createUploadImageHandler((avatar) => {
      const img = new Image();
      img.src = avatar;
      img.addEventListener('load', () => {
        const webpBase64 = imageToBase64({ img, size: AVATAR_COMPRESS_SIZE });
        setAvatar(webpBase64);
      });
    }),
    [],
  );

  return (
    <Upload beforeUpload={handleUploadAvatar} itemRender={() => void 0} maxCount={1}>
      <Avatar size={AVATAR_IMAGE_SIZE} avatar={avatar} />
    </Upload>
  );
});

export default AvatarWithUpload;

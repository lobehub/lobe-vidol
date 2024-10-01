import { Button, Upload } from 'antd';
import { PlusCircle } from 'lucide-react';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string;
  onChange?: (file: File | undefined) => void;
  style?: CSSProperties;
  value?: File;
}

export default memo<Props>(({ value, onChange, className, style }) => {
  const { t } = useTranslation('dance');

  return (
    <Upload
      className={className}
      style={style}
      accept=".mp3,.wav"
      beforeUpload={() => false}
      fileList={value ? [{ uid: '-1', name: value.name, status: 'done' }] : []}
      onChange={(info) => {
        if (info.fileList.length > 0) {
          onChange?.(info.fileList[0].originFileObj);
        } else {
          onChange?.(undefined);
        }
      }}
    >
      <Button icon={<PlusCircle />}>{t('create.audio.upload')}</Button>
    </Upload>
  );
});

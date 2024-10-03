import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_README_LENGTH } from '@/constants/common';

interface Props {
  className?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
  value?: string;
}

export default memo<Props>((props) => {
  const { style, className, value, onChange } = props;
  const { t } = useTranslation('dance');

  return (
    <Input.TextArea
      className={className}
      style={style}
      value={value}
      autoSize={{ minRows: 4, maxRows: 4 }}
      placeholder={t('create.readme.placeholder')}
      showCount
      maxLength={MAX_README_LENGTH}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
});

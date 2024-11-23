import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_NAME_LENGTH } from '@/constants/common';

interface Props {
  className?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
  value?: string;
}

export default memo<Props>(({ value, onChange, className, style }) => {
  const { t } = useTranslation('dance');

  return (
    <Input
      className={className}
      style={style}
      value={value}
      placeholder={t('create.name.desc')}
      maxLength={MAX_NAME_LENGTH}
      showCount
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
});

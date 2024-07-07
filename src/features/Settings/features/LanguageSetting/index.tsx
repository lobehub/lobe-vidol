import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { localeOptions } from '@/locales/resources';
import { switchLang } from '@/utils/switchLang';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const { t } = useTranslation('features');
  const options = [{ label: t('theme.auto'), value: 'auto' }, ...localeOptions];

  return <Select style={style} defaultValue={'auto'} onChange={switchLang} options={options} />;
});

import { Select } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { localeOptions } from '@/locales/resources';
import { useSettingStore } from '@/store/setting';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const { t } = useTranslation('settings');
  const options = [{ label: t('common.theme.locale.auto'), value: 'auto' }, ...localeOptions];

  const [locale, switchLocale] = useSettingStore((s) => [s.config.locale, s.switchLocale], isEqual);

  return (
    <Select
      style={style}
      defaultValue={'auto'}
      onChange={switchLocale}
      options={options}
      value={locale}
    />
  );
});

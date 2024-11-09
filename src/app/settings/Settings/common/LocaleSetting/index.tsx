import { Select } from 'antd';
import { isEqual } from 'lodash-es';
import { useRouter } from 'next/navigation';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { localeOptions } from '@/locales/resources';
import { useSettingStore } from '@/store/setting';
import { LocaleMode } from '@/types/locale';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const { t } = useTranslation('settings');
  const options = [{ label: t('common.theme.locale.auto'), value: 'auto' }, ...localeOptions];
  const router = useRouter();

  const [locale, switchLocale] = useSettingStore((s) => [s.config.locale, s.switchLocale], isEqual);

  const handleChange = (value: string) => {
    switchLocale(value as LocaleMode);
    router.refresh();
  };

  return (
    <Select
      style={style}
      defaultValue={'auto'}
      onChange={handleChange}
      options={options}
      value={locale}
    />
  );
});

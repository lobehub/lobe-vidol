import { ActionIcon } from '@lobehub/ui';
import { Popover } from 'antd';
import { useTheme } from 'antd-style';
import { isEqual } from 'lodash-es';
import { Languages } from 'lucide-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Menu from '@/components/Menu';
import { localeOptions } from '@/locales/resources';
import { useSettingStore } from '@/store/setting';
import { LocaleMode } from '@/types/locale';

const LocaleSwitch = memo(() => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const [switchLocale] = useSettingStore((s) => [s.switchLocale], isEqual);

  const options = [
    { value: 'auto', label: t('common.theme.locale.auto', { ns: 'settings' }) },
    ...localeOptions,
  ];

  return (
    <Popover
      arrow={false}
      content={
        <Menu
          items={options.map((item) => ({
            key: item.value,
            label: item.label,
          }))}
          onClick={({ key }) => {
            switchLocale(key as LocaleMode);
          }}
        />
      }
      overlayInnerStyle={{
        padding: 0,
      }}
      trigger={['click', 'hover']}
    >
      <ActionIcon icon={Languages} style={{ border: `1px solid ${theme.colorFillSecondary}` }} />
    </Popover>
  );
});

export default LocaleSwitch;

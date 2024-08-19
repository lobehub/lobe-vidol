import { Segmented } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingStore } from '@/store/setting';
import { BackgroundEffect } from '@/types/config';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const { t } = useTranslation('common');
  const [backgroundEffect, setBackgroundEffect] = useSettingStore(
    (s) => [s.config.backgroundEffect, s.setBackgroundEffect],
    isEqual,
  );

  return (
    <Segmented
      style={style}
      value={backgroundEffect}
      onChange={(value: BackgroundEffect) => {
        setBackgroundEffect(value);
      }}
      options={[
        {
          label: t('settings.glow'),
          value: 'glow',
        },
        {
          label: t('settings.none'),
          value: 'none',
        },
      ]}
    />
  );
});

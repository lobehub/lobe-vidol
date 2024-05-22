import { Segmented } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo } from 'react';

import { useSettingStore } from '@/store/setting';
import { BackgroundEffect } from '@/types/config';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const [backgroundEffect, setBackgroundEffect] = useSettingStore(
    (s) => [s.backgroundEffect, s.setBackgroundEffect],
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
          label: '光辉',
          value: 'glow',
        },
        {
          label: '无背景',
          value: 'none',
        },
      ]}
    />
  );
});

import { Segmented } from 'antd';
import { ThemeMode } from 'antd-style';
import React, { CSSProperties, memo } from 'react';

import { useGlobalStore } from '@/store/global';

interface Props {
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style } = props;
  const [themeMode, setThemeMode] = useGlobalStore((s) => [s.themeMode, s.setThemeMode]);

  return (
    <Segmented
      style={style}
      value={themeMode}
      onChange={(value: ThemeMode) => {
        setThemeMode(value as ThemeMode);
      }}
      options={[
        {
          label: '🔆 亮色模式',
          value: 'light',
        },
        {
          label: '🌙 暗色模式',
          value: 'dark',
        },
        {
          label: '💻 跟随系统',
          value: 'auto',
        },
      ]}
    />
  );
});

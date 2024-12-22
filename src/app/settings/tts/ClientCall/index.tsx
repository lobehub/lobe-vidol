import { Switch } from 'antd';
import React, { memo } from 'react';

import { useSettingStore } from '@/store/setting';
import { configSelectors } from '@/store/setting/selectors/config';

interface ClientCallProps {
  style?: React.CSSProperties;
}

export default memo(({ style }: ClientCallProps) => {
  const [clientCall, setConfig] = useSettingStore((s) => [
    configSelectors.currentTTSConfig(s).clientCall,
    s.setConfig,
  ]);
  return (
    <Switch
      value={clientCall}
      style={style}
      onChange={(value) => {
        setConfig({ tts: { clientCall: value } });
      }}
    />
  );
});

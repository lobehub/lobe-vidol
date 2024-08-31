import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { supportedLocales } from '@/constants/tts';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [locale, updateAgentTTS] = useAgentStore((s) => [
    agentSelectors.currentAgentTTS(s)?.locale,
    s.updateAgentTTS,
  ]);

  return (
    <Select
      className={className}
      style={style}
      value={locale}
      options={supportedLocales}
      onChange={(value) => {
        updateAgentTTS({ locale: value });
      }}
    />
  );
});

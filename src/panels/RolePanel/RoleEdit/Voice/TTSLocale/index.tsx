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
  const [tts, updateAgentTTS] = useAgentStore((s) => [
    agentSelectors.currentAgentTTS(s),
    s.updateAgentTTS,
  ]);

  return (
    <Select
      className={className}
      style={style}
      value={tts?.locale}
      options={supportedLocales}
      onChange={(value) => {
        updateAgentTTS({ locale: value });
      }}
    />
  );
});

import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { TTS_ENGINE } from '@/types/tts';

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
      value={tts?.engine}
      options={[
        {
          label: 'Edge',
          value: 'edge',
        },
      ]}
      onChange={(value) => {
        updateAgentTTS({ engine: value as TTS_ENGINE });
      }}
    />
  );
});

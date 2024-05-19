import { Slider } from 'antd';
import React, { CSSProperties, memo } from 'react';

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
    <Slider
      className={className}
      style={style}
      value={tts?.speed}
      max={3}
      min={0}
      step={0.01}
      onChange={(value) => {
        updateAgentTTS({ speed: value });
      }}
    />
  );
});

import { InputNumber, Slider } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MAX_TTS_SPEED, MIN_TTS_SPEED, TTS_SPEED_STEP } from '@/constants/tts';
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
    <Flexbox className={className} style={style} flex={1} horizontal gap={8}>
      <Slider
        value={tts?.speed}
        style={{ flex: 1 }}
        min={MIN_TTS_SPEED}
        max={MAX_TTS_SPEED}
        step={TTS_SPEED_STEP}
        onChange={(value) => {
          updateAgentTTS({ speed: value });
        }}
      />
      <InputNumber
        min={MIN_TTS_SPEED}
        max={MAX_TTS_SPEED}
        step={TTS_SPEED_STEP}
        style={{ width: 80 }}
        value={tts?.speed}
        onChange={(value) => {
          updateAgentTTS({ speed: value === null ? undefined : value });
        }}
      />
    </Flexbox>
  );
});

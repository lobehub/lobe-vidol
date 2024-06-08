import { InputNumber, Slider } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MAX_TTS_PITCH, MIN_TTS_PITCH, TTS_PITCH_STEP } from '@/constants/tts';
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
        value={tts?.pitch}
        max={MAX_TTS_PITCH}
        style={{ flex: 1 }}
        min={MIN_TTS_PITCH}
        step={TTS_PITCH_STEP}
        onChange={(value) => {
          updateAgentTTS({ pitch: value });
        }}
      />
      <InputNumber
        min={MIN_TTS_PITCH}
        max={MAX_TTS_PITCH}
        step={TTS_PITCH_STEP}
        style={{ width: 80 }}
        value={tts?.pitch}
        onChange={(value) => {
          updateAgentTTS({ pitch: value === null ? undefined : value });
        }}
      />
    </Flexbox>
  );
});

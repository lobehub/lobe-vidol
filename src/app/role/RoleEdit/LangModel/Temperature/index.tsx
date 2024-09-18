import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const Temperature = memo(() => {
  const [temperature, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentParams(s)?.temperature,
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={1}
      min={0}
      step={0.1}
      value={temperature}
      onChange={(value) => updateAgentConfig({ params: { temperature: value } })}
    />
  );
});

export default Temperature;

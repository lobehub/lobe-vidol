import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const FrequencyPenalty = memo(() => {
  const [frequency_penalty, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentParams(s)?.frequency_penalty,
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={2}
      min={-2}
      step={0.1}
      value={frequency_penalty}
      onChange={(value) => updateAgentConfig({ params: { frequency_penalty: value } })}
    />
  );
});

export default FrequencyPenalty;

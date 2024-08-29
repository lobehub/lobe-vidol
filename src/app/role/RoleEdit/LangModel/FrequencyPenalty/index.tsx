import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const FrequencyPenalty = memo(() => {
  const [agent, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={2}
      min={-2}
      step={0.1}
      value={agent?.params?.frequency_penalty}
      onChange={(value) => updateAgentConfig({ params: { frequency_penalty: value } })}
    />
  );
});

export default FrequencyPenalty;

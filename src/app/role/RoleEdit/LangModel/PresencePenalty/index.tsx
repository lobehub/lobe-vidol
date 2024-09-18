import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const PresencePenalty = memo(() => {
  const [presence_penalty, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentParams(s)?.presence_penalty,
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={2}
      min={-2}
      step={0.1}
      value={presence_penalty}
      onChange={(value) => updateAgentConfig({ params: { presence_penalty: value } })}
    />
  );
});

export default PresencePenalty;

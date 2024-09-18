import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const TopP = memo(() => {
  const [top_p, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentParams(s)?.top_p,
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={1}
      min={0}
      step={0.1}
      value={top_p}
      onChange={(value) => updateAgentConfig({ params: { top_p: value } })}
    />
  );
});

export default TopP;

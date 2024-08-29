import { SliderWithInput } from '@lobehub/ui';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

const TopP = memo(() => {
  const [agent, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    s.updateAgentConfig,
  ]);

  return (
    <SliderWithInput
      max={1}
      min={0}
      step={0.1}
      value={agent?.params?.top_p}
      onChange={(value) => updateAgentConfig({ params: { top_p: value } })}
    />
  );
});

export default TopP;

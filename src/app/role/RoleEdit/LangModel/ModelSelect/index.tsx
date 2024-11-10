import { memo } from 'react';

import Select from '@/features/ModelSelect';
import { agentSelectors, useAgentStore } from '@/store/agent';

const ModelSelect = memo(() => {
  const [model, provider, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s)?.model,
    agentSelectors.currentAgentItem(s)?.provider,
    s.updateAgentConfig,
  ]);

  return (
    <Select
      onChange={(props) => {
        updateAgentConfig(props);
      }}
      value={{ model, provider }}
    />
  );
});

export default ModelSelect;

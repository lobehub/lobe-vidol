import { Switch } from 'antd';
import React, { memo } from 'react';

import { agentSelectors, useAgentStore } from '@/store/agent';

export default memo(() => {
  const [enable, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s)?.touch?.enable,
    s.updateAgentConfig,
  ]);
  return (
    <Switch
      value={enable}
      // style={{ width: 48 }}
      onChange={(value) => {
        updateAgentConfig({ touch: { enable: value } });
      }}
    />
  );
});

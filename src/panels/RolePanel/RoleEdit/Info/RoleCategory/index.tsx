import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { AGENT_CATEGORY_OPTIONS } from '@/constants/agent';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [meta, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s),
    s.updateAgentMeta,
  ]);

  return (
    <Select
      className={className}
      style={style}
      options={AGENT_CATEGORY_OPTIONS}
      value={meta?.category}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ category: value });
      }}
    />
  );
});

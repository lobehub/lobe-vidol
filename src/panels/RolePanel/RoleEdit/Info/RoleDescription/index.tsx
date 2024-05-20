import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { MAX_DESCRIPTION_LENGTH } from '@/constants/common';
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
    <Input
      className={className}
      style={style}
      value={meta?.description}
      placeholder="请输入角色描述"
      maxLength={MAX_DESCRIPTION_LENGTH}
      showCount
      onChange={(e) => {
        updateAgentMeta({ description: e.target.value });
      }}
    />
  );
});

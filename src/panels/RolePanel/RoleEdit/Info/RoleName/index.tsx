import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { MAX_NAME_LENGTH } from '@/constants/common';
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
      value={meta?.name}
      placeholder="请输入角色名称"
      maxLength={MAX_NAME_LENGTH}
      showCount
      onChange={(e) => {
        updateAgentMeta({ name: e.target.value });
      }}
    />
  );
});

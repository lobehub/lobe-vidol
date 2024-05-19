import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';

import { MAX_SYSTEM_ROLE_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [agent, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    s.updateAgentConfig,
  ]);

  return (
    <Input.TextArea
      className={className}
      style={style}
      value={agent?.systemRole}
      autoSize={{ minRows: 16 }}
      placeholder="请输入角色的系统设定"
      showCount
      maxLength={MAX_SYSTEM_ROLE_LENGTH}
      onChange={(e) => {
        updateAgentConfig({ systemRole: e.target.value });
      }}
    />
  );
});

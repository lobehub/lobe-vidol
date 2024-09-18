import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_NAME_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const { t } = useTranslation('role');
  const [name, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s)?.name,
    s.updateAgentMeta,
  ]);

  return (
    <Input
      className={className}
      style={style}
      value={name}
      placeholder={t('role.roleNameTip')}
      maxLength={MAX_NAME_LENGTH}
      showCount
      onChange={(e) => {
        updateAgentMeta({ name: e.target.value });
      }}
    />
  );
});

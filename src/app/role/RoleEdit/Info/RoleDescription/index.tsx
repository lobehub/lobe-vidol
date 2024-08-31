import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_DESCRIPTION_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const { t } = useTranslation('role');
  const [description, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s)?.description,
    s.updateAgentMeta,
  ]);

  return (
    <Input
      className={className}
      style={style}
      value={description}
      placeholder={t('role.roleDescriptionTip')}
      maxLength={MAX_DESCRIPTION_LENGTH}
      showCount
      onChange={(e) => {
        updateAgentMeta({ description: e.target.value });
      }}
    />
  );
});

import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_README_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const { t } = useTranslation('role');
  const [meta, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s),
    s.updateAgentMeta,
  ]);

  return (
    <Input.TextArea
      className={className}
      style={style}
      value={meta?.readme}
      autoSize={{ minRows: 10, maxRows: 10 }}
      placeholder={t('role.roleReadmeTip')}
      showCount
      maxLength={MAX_README_LENGTH}
      onChange={(e) => {
        updateAgentMeta({ readme: e.target.value });
      }}
    />
  );
});

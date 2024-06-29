import { Input } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_GREETING_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const { t } = useTranslation('panel');
  const [agent, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    s.updateAgentConfig,
  ]);

  return (
    <Input.TextArea
      className={className}
      style={style}
      value={agent?.greeting}
      autoSize={{ minRows: 2, maxRows: 4 }}
      placeholder={t('role.greetTip')}
      showCount
      maxLength={MAX_GREETING_LENGTH}
      onChange={(e) => {
        updateAgentConfig({ greeting: e.target.value });
      }}
    />
  );
});

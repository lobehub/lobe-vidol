import { Card, Cards } from '@lobehub/ui/mdx';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [name, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s)?.meta.name,
    s.updateAgentConfig,
  ]);
  const { t } = useTranslation('role');
  return (
    <Cards style={{ marginTop: 24, ...style }} className={className}>
      <Card
        image="https://r2.vidol.chat/common/default.png"
        title={t('systemRole.defaultLabel', { ns: 'role' })}
        onClick={() => {
          updateAgentConfig({
            systemRole: t('systemRole.default', { ns: 'role', char: name }),
          });
        }}
      />
      <Card
        image="https://r2.vidol.chat/common/genshin.png"
        title={t('systemRole.geniusLabel', { ns: 'role' })}
        onClick={() => {
          updateAgentConfig({
            systemRole: t('systemRole.genius', { ns: 'role', char: name }),
          });
        }}
      />
      <Card
        image="https://r2.vidol.chat/common/zzz.png"
        title={t('systemRole.zzzLabel', { ns: 'role' })}
        onClick={() => {
          updateAgentConfig({
            systemRole: t('systemRole.zzz', { ns: 'role', char: name }),
          });
        }}
      />
    </Cards>
  );
});

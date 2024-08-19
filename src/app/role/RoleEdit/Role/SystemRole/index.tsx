import { Card, Cards } from '@lobehub/ui/mdx';
import { Input } from 'antd';
import React, { CSSProperties, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { MAX_SYSTEM_ROLE_LENGTH } from '@/constants/common';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const inputRef = useRef(null);
  const [agent, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s),
    s.updateAgentConfig,
  ]);
  const { t } = useTranslation('role');
  return (
    <Flexbox>
      <Input.TextArea
        ref={inputRef}
        className={className}
        style={style}
        value={agent?.systemRole}
        autoSize={{ minRows: 16 }}
        placeholder={t('role.inputRoleSetting')}
        showCount
        maxLength={MAX_SYSTEM_ROLE_LENGTH}
        onChange={(e) => {
          updateAgentConfig({ systemRole: e.target.value });
        }}
      />
      <Cards style={{ marginTop: 24 }}>
        <Card
          image="https://r2.vidol.chat/common/default.png"
          title={t('systemRole.defaultLabel', { ns: 'role' })}
          onClick={() => {
            updateAgentConfig({
              systemRole: t('systemRole.default', { ns: 'role', char: agent?.meta.name }),
            });
          }}
        />
        <Card
          image="https://r2.vidol.chat/common/genshin.png"
          title={t('systemRole.geniusLabel', { ns: 'role' })}
          onClick={() => {
            updateAgentConfig({
              systemRole: t('systemRole.genius', { ns: 'role', char: agent?.meta.name }),
            });
          }}
        />
        <Card
          image="https://r2.vidol.chat/common/zzz.png"
          title={t('systemRole.zzzLabel', { ns: 'role' })}
          onClick={() => {
            updateAgentConfig({
              systemRole: t('systemRole.zzz', { ns: 'role', char: agent?.meta.name }),
            });
          }}
        />
      </Cards>
    </Flexbox>
  );
});

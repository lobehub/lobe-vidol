import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

export default () => {
  const currentAgent = useAgentStore((s) => agentSelectors.currentAgentItem(s));
  const removeLocalAgent = useAgentStore((s) => s.removeLocalAgent);
  const removeSession = useSessionStore((s) => s.removeSession);
  const { t } = useTranslation(['common', 'role']);

  return (
    <Popconfirm
      cancelText={t('cancel')}
      description={t('delRoleDesc', { name: currentAgent?.meta.name })}
      key="delete"
      okText={t('confirm')}
      onConfirm={() => {
        if (!currentAgent) return;
        removeLocalAgent(currentAgent.agentId);
        removeSession(currentAgent.agentId);
      }}
      title={t('actions.unsubscribe') + '?'}
    >
      <Button danger>{t('delRole')}</Button>
    </Popconfirm>
  );
};

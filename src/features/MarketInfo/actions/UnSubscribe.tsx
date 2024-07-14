import { Button, Popconfirm, message } from 'antd';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { Agent } from '@/types/agent';

interface UnSubscribeButtonProps {
  agent: Agent;
}

const UnSubscribe = memo((props: UnSubscribeButtonProps) => {
  const { agent } = props;
  const removeLocalAgent = useAgentStore((s) => s.removeLocalAgent);
  const removeSessionByAgentId = useSessionStore((s) => s.removeSessionByAgentId);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(['common', 'role']);

  return (
    <Popconfirm
      cancelText={t('cancel')}
      description={t('delRoleDesc', { name: agent?.meta.name, ns: 'role' })}
      key="delete"
      overlayStyle={{ width: 416 }}
      okText={t('confirm')}
      okButtonProps={{ loading: loading, danger: true }}
      onConfirm={async () => {
        if (!agent) return;
        setLoading(true);
        await removeLocalAgent(agent.agentId);
        removeSessionByAgentId(agent.agentId);
        setLoading(false);
        message.success(t('actions.unsubscribeSuccess'));
      }}
      title={t('actions.unsubscribe') + '?'}
    >
      <Button>{t('actions.unsubscribe')}</Button>
    </Popconfirm>
  );
});

export default UnSubscribe;

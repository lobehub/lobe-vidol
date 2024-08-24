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

  const { t } = useTranslation('role');

  return (
    <Popconfirm
      cancelText={t('cancel', { ns: 'common' })}
      description={t('delRoleDesc', { name: agent?.meta.name })}
      key="delete"
      overlayStyle={{ width: 416 }}
      okText={t('confirm', { ns: 'common' })}
      okButtonProps={{ loading: loading, danger: true }}
      onConfirm={async () => {
        if (!agent) return;
        setLoading(true);
        await removeLocalAgent(agent.agentId);
        removeSessionByAgentId(agent.agentId);
        setLoading(false);
        message.success(t('subscribe.success', { ns: 'common' }));
      }}
      title={t('subscribe.undo', { ns: 'common' }) + '?'}
    >
      <Button danger>{t('subscribe.undo', { ns: 'common' })}</Button>
    </Popconfirm>
  );
});

export default UnSubscribe;

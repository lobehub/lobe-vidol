import { Button, Popover, Progress, Space, message } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useDownloadAgent } from '@/hooks/useDownloadAgent';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

interface SubscribeButtonProps {
  agent: Agent;
}

const SubscribeButton = memo((props: SubscribeButtonProps) => {
  const [removeLocalAgent, subscribed] = useAgentStore((s) => [
    s.removeLocalAgent,
    agentSelectors.subscribed(s),
  ]);

  const { fetchAgentData, percent, downloading } = useDownloadAgent();

  const { agent } = props;

  const isSubscribed = subscribed(agent.agentId);

  const { t } = useTranslation('common');

  return (
    <Popover
      open={downloading}
      title={
        <Flexbox>
          <Space>
            <Progress steps={30} percent={percent.cover} size="small" />
            <span>{t('actions.downloadCover')}</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.avatar} size="small" />
            <span>{t('actions.downloadAvatar')}</span>
          </Space>
          <Space>
            <Progress steps={30} percent={percent.model} size="small" />
            <span>{t('actions.downloadModel')}</span>
          </Space>
        </Flexbox>
      }
    >
      <Button
        key={'subscribe'}
        disabled={downloading}
        onClick={async () => {
          if (isSubscribed) {
            removeLocalAgent(agent.agentId).then(() => {
              message.success(t('actions.unsubscribeSuccess'));
            });
          } else {
            await fetchAgentData(agent);
          }
        }}
        type={isSubscribed ? 'default' : 'primary'}
      >
        {isSubscribed ? t('actions.unsubscribe') : t('actions.downloadSubscribe')}
      </Button>
    </Popover>
  );
});

export default SubscribeButton;

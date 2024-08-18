import { Button, Popover, Progress, Space } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useDownloadAgent } from '@/hooks/useDownloadAgent';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

interface SubscribeButtonProps {
  agent: Agent;
}

const Subscribe = memo((props: SubscribeButtonProps) => {
  const { agent } = props;
  const subscribed = useAgentStore((s) => agentSelectors.subscribed(s));

  const { fetchAgentData, percent, downloading } = useDownloadAgent();
  const isSubscribed = subscribed(agent.agentId);

  const { t } = useTranslation('common');

  return (
    <Popover
      open={downloading}
      getPopupContainer={() => document.querySelector('#subscribe_button')!}
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
        id="subscribe_button"
        onClick={async () => {
          await fetchAgentData(agent);
        }}
        type={isSubscribed ? 'default' : 'primary'}
      >
        {t('actions.downloadSubscribe')}
      </Button>
    </Popover>
  );
});

export default Subscribe;

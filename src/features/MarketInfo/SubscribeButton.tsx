import { Button, Progress, message } from 'antd';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { fetchWithProgress } from '@/utils/fetch';
import { getModelPathByAgentId } from '@/utils/model';
import { setItem } from '@/utils/storage';

interface SubscribeButtonProps {
  agent: Agent;
}

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [downloading, setDownloading] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  const [addLocalAgent, removeLocalAgent, subscribed] = useAgentStore((s) => [
    s.addLocalAgent,
    s.removeLocalAgent,
    agentSelectors.subscribed(s),
  ]);

  const { agent } = props;

  const isSubscribed = subscribed(agent.agentId);

  return (
    <Button
      key={'subscribe'}
      disabled={downloading}
      onClick={async () => {
        if (isSubscribed) {
          removeLocalAgent(agent.agentId).then(() => {
            message.success('已取消订阅');
          });
        } else {
          if (agent.meta.model) {
            setDownloading(true);
            setPercent(0);
            try {
              const blob = await fetchWithProgress(agent.meta.model!, {
                onProgress: (loaded, total) => {
                  setPercent((loaded / total) * 100);
                },
              });
              const modelKey = getModelPathByAgentId(agent.agentId);
              await setItem(modelKey, blob);
            } catch (e) {
              console.error(e);
              message.error('下载失败');
            } finally {
              setDownloading(false);
              setPercent(0);
            }
          }
          addLocalAgent(agent);
          message.success('订阅成功');
        }
      }}
      type={isSubscribed ? 'default' : 'primary'}
    >
      {isSubscribed ? (
        '取消订阅'
      ) : (
        <Flexbox align={'center'} horizontal gap={8}>
          下载订阅{' '}
          {downloading ? <Progress type="circle" percent={percent} size={[20, 20]} /> : null}
        </Flexbox>
      )}
    </Button>
  );
};

export default SubscribeButton;

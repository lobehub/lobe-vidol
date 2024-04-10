import { agentListSelectors, useAgentStore } from '@/store/agent';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, List } from 'antd';
import { memo } from 'react';

const { Meta } = List.Item;

const AgentList = () => {
  const [activateAgent, agentList, agentLoading, showAgentSidebar] = useMarketStore((s) => [
    s.activateAgent,
    s.agentList,
    s.agentLoading,
    marketStoreSelectors.showAgentSideBar(s),
  ]);
  const [subscribed] = useAgentStore((s) => [agentListSelectors.subscribed(s)]);
  return (
    <List
      dataSource={agentList}
      grid={{ column: showAgentSidebar ? 3 : 4, gutter: 8 }}
      loading={agentLoading}
      renderItem={(item) => {
        const { avatar, name } = item?.meta || {};
        const isSubscribed = subscribed(item.agentId);
        return (
          <List.Item style={{ position: 'relative' }}>
            <Card
              onClick={() => {
                activateAgent(item.agentId);
              }}
              hoverable
              // eslint-disable-next-line @next/next/no-img-element,
              cover={<img src={avatar} alt="cover" />}
            >
              <Meta title={name} />
            </Card>
            {isSubscribed ? (
              <CheckCircleTwoTone
                style={{ fontSize: 24, position: 'absolute', right: 8, top: 8 }}
                twoToneColor="#52c41a"
              />
            ) : null}
          </List.Item>
        );
      }}
    />
  );
};

export default memo(AgentList);

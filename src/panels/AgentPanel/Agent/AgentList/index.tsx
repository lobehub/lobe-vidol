import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useMarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { GradientButton } from '@lobehub/ui';
import { Card, List, Typography } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const { Text } = Typography;
const { Meta } = Card;

interface AgentListProps {
  dataSource: Agent[];
  title: string;
}

const AgentList = (props: AgentListProps) => {
  const { title, dataSource } = props;
  const [activateAgent, showAgentSidebar] = useAgentStore((s) => [
    s.activateAgent,
    agentListSelectors.showSideBar(s),
  ]);
  const openPanel = useConfigStore((s) => s.openPanel);
  const [setTab] = useMarketStore((s) => [s.setTab]);

  return (
    <>
      <Flexbox align="center" distribution="space-between" horizontal style={{ marginBottom: 12 }}>
        <h2>{title}</h2>
        <GradientButton
          glow
          onClick={() => {
            openPanel('market');
            setTab('agent');
          }}
          size="middle"
        >
          + 订阅角色
        </GradientButton>
      </Flexbox>
      <List
        dataSource={dataSource}
        grid={{ column: showAgentSidebar ? 3 : 4, gutter: 8 }}
        renderItem={(item) => {
          const { cover, name, description } = item.meta;
          return (
            <List.Item>
              <Card
                onClick={() => {
                  activateAgent(item.agentId);
                }}
                hoverable
                // eslint-disable-next-line @next/next/no-img-element,
                cover={<img src={cover} alt="cover" />}
              >
                <Meta
                  description={
                    <Text ellipsis={{ tooltip: description }} style={{ width: 200 }}>
                      {description}
                    </Text>
                  }
                  title={name}
                />
              </Card>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default memo(AgentList);

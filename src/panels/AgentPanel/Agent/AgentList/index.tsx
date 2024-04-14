import { Card, List, Typography } from 'antd';
import React, { memo } from 'react';

import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';

const { Text } = Typography;
const { Meta } = Card;

interface AgentListProps {
  className?: string;
  dataSource: Agent[];
  style?: React.CSSProperties;
  title: string;
}

const AgentList = (props: AgentListProps) => {
  const { dataSource, className, style } = props;
  const [activateAgent, showAgentSidebar] = useAgentStore((s) => [
    s.activateAgent,
    agentListSelectors.showSideBar(s),
  ]);

  return (
    <List
      style={style}
      className={className}
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
  );
};

export default memo(AgentList);

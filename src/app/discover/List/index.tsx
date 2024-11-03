import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { t } from 'i18next';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import RoleCard from '@/components/RoleCard';
import SkeletonList from '@/components/SkeletonList';
import { Agent } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    height: 100%;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
  list: css`
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    padding: 0 ${token.paddingSM}px;
  `,
}));

interface AgentListProps {
  activateAgent: (agentId: string) => void;
  agents: Agent[];
  className?: string;
  loading: boolean;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const { activateAgent, className, style, agents = [], loading } = props;
  const { styles } = useStyles();

  if (loading) {
    return <SkeletonList count={6} />;
  }

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Flexbox className={styles.list} flex={1}>
        {agents.length === 0 ? (
          <Empty description={t('noDanceList')} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
        ) : (
          <Grid maxItemWidth={240} gap={16}>
            {agents.map((agent) => (
              <RoleCard
                key={agent.agentId}
                agent={agent}
                onClick={() => activateAgent(agent.agentId)}
              />
            ))}
          </Grid>
        )}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(AgentList);

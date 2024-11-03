import { Grid } from '@lobehub/ui';
import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { t } from 'i18next';
import React, { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useMarketStore } from '@/store/market';

import AgentItem from './Item';
import SkeletonList from './SkeletonList';

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
  className?: string;
  style?: React.CSSProperties;
}

const AgentList = (props: AgentListProps) => {
  const [agentList, agentLoading, fetchAgentIndex] = useMarketStore((s) => [
    s.agentList,
    s.agentLoading,
    s.fetchAgentIndex,
  ]);

  const { className, style } = props;

  const { styles } = useStyles();

  useEffect(() => {
    fetchAgentIndex();
  }, [fetchAgentIndex]);

  if (agentLoading) {
    return <SkeletonList />;
  }

  return (
    <Flexbox className={classNames(className, styles.container)} style={style}>
      <Flexbox className={styles.list} flex={1}>
        {agentList.length === 0 ? (
          <Empty description={t('noDanceList')} image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>
        ) : (
          <Grid maxItemWidth={240} gap={16}>
            {agentList.map((agent) => (
              <AgentItem agentItem={agent} key={agent.agentId} />
            ))}
          </Grid>
        )}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(AgentList);

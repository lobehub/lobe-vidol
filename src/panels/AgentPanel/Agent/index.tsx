import { useAgentStore } from '@/store/agent';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';
import AgentCard from './AgentCard';
import AgentList from './AgentList';

const TopBanner = dynamic(() => import('./TopBanner'), { ssr: false });

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;

    display: flex;

    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    overflow-y: auto;
    flex-grow: 1;
    padding-right: 24px;
    padding-left: 24px;
  `,
}));

interface AgentProps {
  className?: string;
  style?: React.CSSProperties;
}

const Agent = (props: AgentProps) => {
  const { styles } = useStyles();
  const { style, className } = props;
  const [subscribedList] = useAgentStore((s) => [s.subscribedList]);

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner />
        <AgentList dataSource={subscribedList} title="订阅列表" />
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);

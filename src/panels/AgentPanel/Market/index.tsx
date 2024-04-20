import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';

import TopBanner from '@/components/TopBanner';

import AgentCard from './Card';
import AgentList from './List';

const useStyles = createStyles(({ css }) => ({
  market: css`
    position: relative;

    display: flex;

    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  container: css`
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    overflow-y: auto;
    max-width: 1024px;
    margin: 0 auto;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

interface AgentProps {
  className?: string;
  style?: React.CSSProperties;
}

const Agent = (props: AgentProps) => {
  const { styles } = useStyles();
  const { style, className } = props;

  return (
    <div className={classNames(className, styles.market)} style={style}>
      <div className={styles.container}>
        <div className={styles.content}>
          <TopBanner title="Find Your Lovest Vidol" />
          <AgentList />
        </div>
      </div>
      <AgentCard />
    </div>
  );
};

export default Agent;

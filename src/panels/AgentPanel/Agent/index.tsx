import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import TopBanner from '@/components/TopBanner';
import RoleInfo from '@/features/RoleInfo';

import AgentList from './List';

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

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title="Hello, Let's Chat!" />
        <AgentList />
      </div>
      <RoleInfo />
    </div>
  );
};

export default memo(Agent);

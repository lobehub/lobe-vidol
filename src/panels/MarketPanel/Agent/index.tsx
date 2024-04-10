import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';
import AgentCard from './AgentCard';
import AgentIndex from './AgentIndex';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
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
  const { theme, styles } = useStyles();
  const { style, className } = props;

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>Find Your Lovest VChat</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <AgentIndex />
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);

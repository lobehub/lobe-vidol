import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';
import DanceCard from './DanceCard';
import DanceList from './DanceList';

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

interface DanceProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const { theme, styles } = useStyles();
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}> Just Dance </h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <DanceList />
      </div>
      <DanceCard />
    </div>
  );
};

export default memo(Dance);

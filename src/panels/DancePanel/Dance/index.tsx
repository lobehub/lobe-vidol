import classNames from 'classnames';
import React, { memo } from 'react';

import TopBanner from '@/components/TopBanner';

import DanceCard from './Card';
import DanceList from './List';
import { useStyles } from './style';

interface DanceProps {
  className?: string;
  setTab?: (tab: string) => void;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className, setTab } = props;
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title={"Hi, Let's Dance!"} />
        <DanceList setTab={setTab} />
      </div>
      <DanceCard />
    </div>
  );
};

export default memo(Dance);

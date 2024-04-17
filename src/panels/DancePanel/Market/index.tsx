import classNames from 'classnames';
import React from 'react';

import TopBanner from '@/components/TopBanner';

import DanceCard from './Card';
import DanceList from './List';
import { useStyles } from './style';

interface DanceProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title="Find Your Favorite Dance" />
        <DanceList />
      </div>
      <DanceCard />
    </div>
  );
};

export default Dance;

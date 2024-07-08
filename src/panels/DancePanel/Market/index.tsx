import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('panel');
  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title={t('dance.findDance')} />
        <DanceList />
      </div>
      <DanceCard />
    </div>
  );
};

export default Dance;

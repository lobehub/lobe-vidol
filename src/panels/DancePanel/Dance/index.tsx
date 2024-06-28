import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('chat');

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title={t('helloDance')} />
        <DanceList setTab={setTab} />
      </div>
      <DanceCard />
    </div>
  );
};

export default memo(Dance);

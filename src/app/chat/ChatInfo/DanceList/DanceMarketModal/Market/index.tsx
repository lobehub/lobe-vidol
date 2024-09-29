import { SearchBar } from '@lobehub/ui';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import TopBanner from '@/components/TopBanner';
import { HEADER_HEIGHT } from '@/constants/token';

import DanceCard from './Card';
import DanceList from './List';
import { useStyles } from './style';

const CreateDanceModal = dynamic(() => import('./CreateDanceModal'));

interface DanceProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('dance');
  const [searchName, setSearchName] = useState<string>();

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <div className={styles.content}>
        <TopBanner title={t('findDance')} />

        <Flexbox
          justify={'space-between'}
          horizontal
          gap={8}
          align={'center'}
          style={{ height: HEADER_HEIGHT }}
        >
          <SearchBar
            enableShortKey
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder={t('search')}
            shortKey="f"
            spotlight
            type={'block'}
            value={searchName}
            style={{ flex: 1 }}
          />
          <CreateDanceModal />
        </Flexbox>

        <DanceList filter={searchName} />
      </div>
      <DanceCard />
    </div>
  );
};

export default Dance;

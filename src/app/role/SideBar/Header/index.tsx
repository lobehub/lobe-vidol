import { TabsNav } from '@lobehub/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Agent from '@/features/Actions/Agent';

import { useStyles } from './style';

const Index = () => {
  const { styles } = useStyles();
  const [tab, setTab] = useState('session');
  const { t } = useTranslation('role');

  const options = [
    { key: 'session', label: t('header.session') },
    { key: 'character', label: t('header.role') },
  ];

  return (
    <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
      <TabsNav items={options} size="small" activeKey={tab} onChange={setTab} variant={'compact'} />
      <Agent key={'agent'} />
    </Flexbox>
  );
};

export default Index;

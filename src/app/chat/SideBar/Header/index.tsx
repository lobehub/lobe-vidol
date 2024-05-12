import { TabsNav } from '@lobehub/ui';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Market from '@/features/Actions/Market';

import { useStyles } from './style';

const Index = () => {
  const { styles } = useStyles();
  const [tab, setTab] = useState('session');

  const options = [
    { key: 'session', label: '对话' },
    { key: 'character', label: '角色' },
  ];

  return (
    <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
      <TabsNav items={options} size="small" activeKey={tab} onChange={setTab} variant={'compact'} />
      <Market key={'market'} />
    </Flexbox>
  );
};

export default Index;

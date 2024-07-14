'use client';

import React from 'react';
import { Flexbox } from 'react-layout-kit';

import Settings from './Settings';
import { useStyles } from './style';

export default () => {
  const { styles } = useStyles();
  return (
    <Flexbox height={'100%'} className={styles.settings}>
      <Settings />
    </Flexbox>
  );
};

'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import TokenMini from '@/features/Actions/TokenMini';

import { useStyles } from './style';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Alert = (props: Props) => {
  const { className, style } = props;
  const { styles } = useStyles();

  return (
    <Flexbox
      horizontal
      justify={'space-between'}
      style={style}
      className={className}
      align={'center'}
    >
      <div className={styles.alert}>请谨记：智能体所说的一切都是由 AI 生成的</div>
      <TokenMini />
    </Flexbox>
  );
};

export default memo(Alert);

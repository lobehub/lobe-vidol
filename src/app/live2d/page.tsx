'use client';

import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import Live2DViewer from '@/features/Live2DViewer';

const Role = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <Live2DViewer />
    </Flexbox>
  );
};

export default memo(Role);

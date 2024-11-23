'use client';

import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import CallOff from './actions/CallOff';
import Record from './actions/Record';
import Setting from './actions/Setting';

const VoiceOperation = memo(() => {
  return (
    <Flexbox gap={24} horizontal>
      <Record />
      <CallOff />
      <Setting />
    </Flexbox>
  );
});

export default VoiceOperation;

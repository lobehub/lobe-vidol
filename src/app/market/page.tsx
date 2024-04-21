'use client';

import { Flexbox } from 'react-layout-kit';

import AgentMarket from '@/panels/AgentPanel/Market';

const Index = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'}>
      <AgentMarket />
    </Flexbox>
  );
};

export default Index;

import { Flexbox } from 'react-layout-kit';

import Discover from './Discover';

// import AgentMarket from './Market';

const Index = () => {
  return (
    <Flexbox flex={1} height={'100%'} width={'100%'}>
      {/* <AgentMarket /> */}
      <Discover />
    </Flexbox>
  );
};

export default Index;

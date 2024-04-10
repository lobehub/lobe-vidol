import { memo } from 'react';
import AgentList from './AgentList';
import Header from './Header';

const AgentIndex = () => {
  return (
    <>
      <Header style={{ marginBottom: 12 }} />
      <AgentList />
    </>
  );
};

export default memo(AgentIndex);

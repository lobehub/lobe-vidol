import { memo } from 'react';
import DanceList from './DanceList';
import Header from './Header';

const DanceIndex = () => {
  return (
    <>
      <Header style={{ marginBottom: 12 }} />
      <DanceList />
    </>
  );
};

export default memo(DanceIndex);

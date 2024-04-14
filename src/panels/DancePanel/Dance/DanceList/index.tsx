import React from 'react';

import GridList from '@/components/GridList';
import { useDanceStore } from '@/store/dance';

interface DanceListProps {
  className?: string;
  style?: React.CSSProperties;
}

const DanceList = (props: DanceListProps) => {
  const { className, style } = props;
  const [danceList, activateDance, currentIdentifier] = useDanceStore((s) => [
    s.danceList,
    s.activateDance,
    s.currentIdentifier,
  ]);

  return (
    <GridList
      className={className}
      style={style}
      items={danceList.map((items) => ({
        avatar: items.thumb,
        id: items.danceId,
        name: items.name,
      }))}
      onClick={(id) => {
        activateDance(id);
      }}
      isActivated={(id) => id === currentIdentifier}
    />
  );
};

export default DanceList;

import React, { memo, useState } from 'react';

import GridList from '@/components/GridList';
import { MixamoList } from '@/features/MotionList/mixamo';
import { useGlobalStore } from '@/store/global';
import { fetchWithProgress } from '@/utils/fetch';

interface MotionListProps {
  className?: string;
  style?: React.CSSProperties;
}

const MotionList = (props: MotionListProps) => {
  const { className, style } = props;
  const [currentId, setCurrentId] = useState<string>('');
  const viewer = useGlobalStore((s) => s.viewer);

  return (
    <GridList
      className={className}
      style={style}
      items={MixamoList.map((item) => ({
        ...item,
        avatar: item.thumbnail_animated,
        id: item.id,
        name: item.name,
      }))}
      onClick={async (id, item: any) => {
        setCurrentId(id);
        if (item.url) {
          const blob = await fetchWithProgress(item.url);
          const url = window.URL.createObjectURL(blob);

          viewer.model?.loadFBX(url);
        }
      }}
      isActivated={(id) => id === currentId}
    />
  );
};

export default memo(MotionList);

import classNames from 'classnames';
import React, { memo, useState } from 'react';

import GridList from '@/components/GridList';
import { POSTURE_CONFIG } from '@/constants/touch';
import { useGlobalStore } from '@/store/global';
import { GenderEnum } from '@/types/agent';
import { fetchWithProgress } from '@/utils/fetch';

import { useStyles } from './style';

interface MotionListProps {
  className?: string;
  style?: React.CSSProperties;
}

const MotionList = (props: MotionListProps) => {
  const { className, style } = props;
  const [currentId, setCurrentId] = useState<string>('');
  const viewer = useGlobalStore((s) => s.viewer);
  const { styles } = useStyles();

  return (
    <GridList
      className={classNames(className, styles.list)}
      style={style}
      items={[...POSTURE_CONFIG[GenderEnum.FEMALE], ...POSTURE_CONFIG[GenderEnum.MALE]].map(
        (item) => ({
          ...item,
          avatar: item.avatar,
          id: item.id,
          name: item.name,
        }),
      )}
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

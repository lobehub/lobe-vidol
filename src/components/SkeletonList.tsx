'use client';

import { Skeleton, SkeletonProps } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const useStyles = createStyles(({ css }) => ({
  paragraph: css`
    height: 12px !important;
    margin-block-start: 12px !important;

    > li {
      height: 12px !important;
    }
  `,
  title: css`
    height: 14px !important;
    margin-block: 4px 12px !important;

    > li {
      height: 14px !important;
    }
  `,
}));

interface SkeletonListProps {
  avatar?: SkeletonProps['avatar'];
  count?: number;
  style?: React.CSSProperties;
}

const SkeletonList = memo<SkeletonListProps>(({ count = 4, avatar = true, style }) => {
  const { styles } = useStyles();

  const list = Array.from({ length: count }).fill('');

  return (
    <Flexbox gap={8} paddingInline={8} flex={1} style={style}>
      {list.map((_, index) => (
        <Skeleton
          active
          avatar={avatar}
          key={index}
          paragraph={{ className: styles.paragraph, rows: 1 }}
          title={{ className: styles.title }}
        />
      ))}
    </Flexbox>
  );
});
export default SkeletonList;

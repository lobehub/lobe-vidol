'use client';

import { Skeleton, SkeletonProps } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
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
}

const SkeletonList = memo<SkeletonListProps>(({ count = 4, avatar = true }) => {
  const { styles } = useStyles();

  const list = Array.from({ length: count }).fill('');

  return (
    <Flexbox gap={8} paddingInline={16} flex={1}>
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

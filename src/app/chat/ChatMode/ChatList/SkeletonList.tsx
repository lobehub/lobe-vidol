'use client';

import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { CHAT_INPUT_WIDTH } from '@/constants/token';

const useStyles = createStyles(({ css, prefixCls, responsive }) => ({
  message: css`
    display: flex;
    gap: 12px;

    width: ${CHAT_INPUT_WIDTH};
    min-width: 480px;
    max-width: 100vw;

    .${prefixCls}-skeleton-header {
      padding: 0;
    }

    ${responsive.mobile} {
      width: 100%;
    }
  `,
  user: css`
    flex-direction: row-reverse;
    width: ${CHAT_INPUT_WIDTH};
    min-width: 480px;
    max-width: 100vw;

    .${prefixCls}-skeleton-paragraph {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    ${responsive.mobile} {
      width: 100%;
    }
  `,
}));
interface SkeletonListProps {
  count?: number;
  mobile?: boolean;
}
const SkeletonList = memo<SkeletonListProps>(({ count = 3, mobile }) => {
  const { cx, styles } = useStyles();

  return (
    <Flexbox gap={24} padding={mobile ? 8 : 12}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Skeleton
            active
            avatar={{ size: mobile ? 32 : 40 }}
            className={cx(styles.message, styles.user)}
            paragraph={{ width: mobile ? ['80%', '40%'] : ['50%', '30%'] }}
            title={false}
          />
          <Skeleton
            active
            avatar={{ size: mobile ? 32 : 40 }}
            className={styles.message}
            paragraph={{ width: mobile ? ['80%', '40%'] : ['50%', '30%'] }}
            title={false}
          />
        </div>
      ))}
    </Flexbox>
  );
});
export default SkeletonList;

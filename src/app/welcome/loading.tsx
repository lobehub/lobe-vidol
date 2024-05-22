'use client';

import { createStyles } from 'antd-style';

import PageLoading from '@/components/PageLoading';

const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 64px);
  `,
}));

const Loading = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.content}>
      <PageLoading
        title={'应用初始化中，请稍后...'}
        description={
          '项目当前正在施工中，不保证数据稳定性，如果遇到问题可以在系统设置中清除数据，造成的不便敬请谅解'
        }
      />
    </div>
  );
};

export default Loading;

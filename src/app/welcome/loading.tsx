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
      <PageLoading title={'应用初始化中，请稍后...'} />
    </div>
  );
};

export default Loading;

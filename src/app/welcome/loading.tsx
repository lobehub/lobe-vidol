'use client';

import { createStyles } from 'antd-style';
import { useTranslation } from 'react-i18next';

import PageLoading from '@/components/PageLoading';

const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  `,
}));

const Loading = () => {
  const { styles } = useStyles();
  const { t } = useTranslation('welcome');
  return (
    <div className={styles.content}>
      <PageLoading title={t('loadingTitle')} />
    </div>
  );
};

export default Loading;

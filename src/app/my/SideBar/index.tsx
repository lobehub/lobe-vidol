'use client';

import { createStyles, useResponsive } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import MyList, { MyListProps } from './MyList';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    border-inline-end: 1px solid ${token.colorBorder};
  `,
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    font-size: 20px;
    font-weight: bold;
  `,
}));

const SideBar = memo<MyListProps>(({ activeTab }) => {
  const { styles } = useStyles();

  const { mobile } = useResponsive();

  const { t } = useTranslation('my');

  return (
    <Flexbox className={styles.container} width={280}>
      <Flexbox className={styles.top} padding={16}>
        {t('my')}
      </Flexbox>
      <Flexbox gap={8} style={{ paddingInline: 8 }}>
        <MyList activeTab={activeTab} mobile={mobile} />
      </Flexbox>
    </Flexbox>
  );
});

export default SideBar;

'use client';

import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import CreateRole from './CreateRole';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    inset-block-start: 0;
    height: 64px;
    line-height: 64px;
  `,
}));

const RoleHeader = memo(() => {
  const { styles } = useStyles();
  const { t } = useTranslation('role');

  return (
    <Flexbox className={styles.top} gap={16} padding={12}>
      <Flexbox distribution={'space-between'} horizontal>
        <Flexbox align={'center'} gap={4} horizontal>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {t('role.myRole')}
          </Typography.Title>
        </Flexbox>
        <CreateRole />
      </Flexbox>
    </Flexbox>
  );
});

export default RoleHeader;

'use client';

import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { BRANDING_NAME } from '@/constants/branding';

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

const ChatHeader = memo(() => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.top} gap={16} padding={12}>
      <Flexbox distribution={'space-between'} horizontal>
        <Flexbox align={'center'} gap={4} horizontal>
          <Typography.Title level={4} style={{ margin: 0, height: 40, lineHeight: '40px' }}>
            {BRANDING_NAME}
          </Typography.Title>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default ChatHeader;

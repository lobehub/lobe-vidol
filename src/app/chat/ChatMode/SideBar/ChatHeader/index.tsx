'use client';

import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ProductLogo } from '@/components/Branding';

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    color: ${token.colorText};
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    inset-block-start: 0;
  `,
}));

const ChatHeader = memo(() => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.top} gap={16} padding={12}>
      <Flexbox distribution={'space-between'} horizontal>
        <Flexbox align={'center'} gap={4} horizontal>
          <ProductLogo className={styles.logo} size={36} type={'text'} />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default ChatHeader;

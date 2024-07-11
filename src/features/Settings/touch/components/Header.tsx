import { createStyles } from 'antd-style';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

interface HeaderProps {
  extra?: React.ReactNode;
  title: React.ReactNode;
}

const useStyles = createStyles(({ css, token }) => ({
  title: css`
    font-size: ${token.fontSize}px;
    color: ${token.colorPrimary};
  `,

  header: css`
    align-items: center;
    height: 48px;
    font-size: ${token.fontSize}px;
  `,
}));

export default (props: HeaderProps) => {
  const { styles } = useStyles();
  const { title, extra } = props;
  return (
    <Flexbox justify="space-between" horizontal className={styles.header}>
      <div className={styles.title}>{title}</div>
      {extra}
    </Flexbox>
  );
};

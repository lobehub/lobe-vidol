import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

interface HeaderProps {
  className?: string;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
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
  const { title, extra, style, className } = props;
  return (
    <Flexbox
      justify="space-between"
      horizontal
      className={classNames(styles.header, className)}
      style={style}
    >
      <div className={styles.title}>{title}</div>
      {extra}
    </Flexbox>
  );
};

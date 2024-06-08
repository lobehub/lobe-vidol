import { Space, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo } from 'react';

const { Link } = Typography;
const useStyles = createStyles(({ css, token }) => ({
  author: css`
    font-size: ${token.fontSizeSM}px;
  `,
  date: css`
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextDescription};
  `,
}));

interface Props {
  author?: string;
  createAt?: string;
  homepage?: string;
}

export default memo((props: Props) => {
  const { author, createAt, homepage } = props;

  const { styles } = useStyles();
  return (
    <Space>
      <Link aria-label={author} className={styles.author} href={homepage} target={'_blank'}>
        @{author}
      </Link>
      <div className={styles.date}>{createAt}</div>
    </Space>
  );
});

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
  item?: { author: string; createAt: string; homepage: string };
}

export default memo((props: Props) => {
  const { item } = props;

  const { styles } = useStyles();
  return (
    <Space>
      <Link
        aria-label={item?.author}
        className={styles.author}
        href={item?.homepage}
        target={'_blank'}
      >
        @{item?.author}
      </Link>
      <div className={styles.date}>{item?.createAt}</div>
    </Space>
  );
});

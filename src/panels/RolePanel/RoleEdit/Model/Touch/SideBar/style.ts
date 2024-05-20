import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));

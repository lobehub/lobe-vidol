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
  header: css`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 16px 8px;

    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));

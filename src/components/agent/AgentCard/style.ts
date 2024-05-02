import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  actions: css``,
  author: css`
    font-size: 12px;
  `,
  avatar: css`
    flex: none;
  `,
  container: css`
    position: relative;
    padding: ${token.padding}px;
  `,
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  footer: css`
    width: 100%;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,

  title: css`
    display: flex;
    align-items: center;

    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));

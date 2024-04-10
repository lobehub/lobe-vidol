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
    overflow-y: auto;
    height: 100%;
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
    padding: 16px 16px 24px;
    white-space: break-spaces;
  `,
  header: css`
    position: relative;
    padding: 16px 16px 24px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,

  title: css`
    display: flex;
    align-items: center;

    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));

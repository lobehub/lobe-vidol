import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    padding: 16px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
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
    overflow-y: auto;
    height: 300px;
    padding: 8px;
    white-space: break-spaces;
  `,

  title: css`
    overflow: hidden;

    width: 160px;

    font-size: 20px;
    font-weight: 600;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}));

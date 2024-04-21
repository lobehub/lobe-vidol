import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
  `,
  alert: css`
    padding: ${token.marginXS}px;
    color: ${token.colorTextTertiary};
  `,
}));

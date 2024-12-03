import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  alert: css`
    width: 100%;
    color: ${token.colorTextTertiary};
  `,
}));

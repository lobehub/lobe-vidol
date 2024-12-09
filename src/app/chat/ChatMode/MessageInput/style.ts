import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  alert: css`
    color: ${token.colorTextTertiary};
  `,
}));

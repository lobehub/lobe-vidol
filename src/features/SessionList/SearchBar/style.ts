import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  header: css`
    padding: ${token.paddingXS}px;
  `,
}));

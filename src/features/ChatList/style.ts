import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  header: css`
    padding: 0 ${token.paddingSM}px;
  `,
  list: css`
    position: relative;
    height: 100%;
  `,
}));

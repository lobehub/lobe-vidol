import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token }) => ({
  preview: cx(
    'role-preview',
    css`
      overflow: scroll;
      width: 100%;
      height: 100%;
      padding: 0 ${token.paddingSM}px;
    `,
  ),
  container: css`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
  `,
}));

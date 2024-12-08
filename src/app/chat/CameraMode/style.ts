import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, responsive }) => ({
  viewer: css`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  `,
  content: css`
    min-width: 360px;
    max-width: 100vw;
    padding: 0 12px;

    ${responsive.mobile} {
      width: 100%;
    }
  `,
  dialog: css`
    z-index: 2;
    margin: ${token.marginLG}px auto 0;
  `,
  docker: css`
    z-index: 2;
    width: 100%;
    margin-bottom: ${token.marginLG}px;
    padding: ${token.paddingSM}px;
  `,
  mask: css``,
}));

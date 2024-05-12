import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  toolbar: css`
    position: absolute;
    right: ${token.paddingMD}px;
    bottom: 50%;
    display: flex;
  `,
  viewer: css`
    position: relative;
    height: 100%;
    min-height: 0;
  `,
  canvas: css`
    display: block;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  `,
}));

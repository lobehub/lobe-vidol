import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  viewer: css`
    cursor: pointer;

    position: relative;

    width: 100%;
    height: 100%;
    min-height: 0;
  `,
  toolbar: css`
    position: absolute;
    z-index: 1;
    right: ${token.paddingMD}px;
    bottom: 50%;

    display: flex;
  `,
  loading: css`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  `,
  canvas: css`
    display: block;

    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;

    background-color: ${token.colorBgLayout};
  `,
}));

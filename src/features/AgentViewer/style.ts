import { createStyles } from 'antd-style';
import { rgba } from 'polished';

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

    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
  canvas: css`
    display: block;

    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  `,
}));

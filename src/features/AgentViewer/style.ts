import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  toolbar: css`
    position: absolute;
    right: ${token.paddingMD}px;
    bottom: 50%;
    display: flex;
  `,
  dialog: css`
    position: absolute;
    top: ${token.paddingMD}px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;

    min-width: 480px;
  `,
  // controller: css`
  //   position: absolute;
  //   right: ${token.paddingMD}px;
  //   top: ${token.paddingMD}px;
  // `,
  viewer: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
}));

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  mask: css`
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${token.colorBgMask};
  `,
  playIcon: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 24px;
    color: ${token.colorText};
  `,
  listItem: css`
    position: relative;

    height: 64px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    border-radius: ${token.borderRadius}px;
  `,
}));

export { useStyles };

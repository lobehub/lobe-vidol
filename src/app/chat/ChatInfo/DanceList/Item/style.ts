import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  mask: css`
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: ${token.colorBgMask};
  `,
  progress: css`
    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 100%;
  `,
  playIcon: css`
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

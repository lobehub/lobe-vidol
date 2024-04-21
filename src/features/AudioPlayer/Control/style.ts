import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  back: css`
    cursor: pointer;
    margin-right: ${token.marginMD}px;
  `,
  control: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  forward: css`
    cursor: pointer;
    margin-left: ${token.marginMD}px;
  `,
  playPause: css`
    cursor: pointer;
    color: ${token.colorPrimary};
  `,
}));

export { useStyles };

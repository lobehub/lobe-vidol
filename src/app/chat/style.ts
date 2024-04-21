import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    max-width: 42vw;
    padding: 8px 12px;
  `,
  alert: css`
    padding: ${token.marginXS}px;
    color: ${token.colorTextTertiary};
  `,
}));

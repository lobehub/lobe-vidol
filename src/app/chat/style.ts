import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    padding: ${token.paddingXS}px;
    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(2px);
  `,
  input: css`
    max-width: 42vw;
  `,
  alert: css`
    padding: ${token.marginXS}px;
    color: ${token.colorTextTertiary};
  `,
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    position: absolute;
    bottom: 0;

    width: 100%;
    padding: ${token.paddingXS}px;

    border-top: 1px solid ${token.colorBorder};
  `,
}));

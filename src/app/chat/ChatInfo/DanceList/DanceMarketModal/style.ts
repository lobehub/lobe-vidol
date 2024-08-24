import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  modalBody: css`
    height: 640px;
    padding: 0;
    padding-block: 0 !important;
    padding-inline: 0 !important;

    border-top: 1px solid ${token.colorBorder};
  `,
}));

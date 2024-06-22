import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  dialog: css`
    overflow-y: auto;
    max-height: 480px;
  `,
}));

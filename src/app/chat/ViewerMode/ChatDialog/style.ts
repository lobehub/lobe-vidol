import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => ({
  dialog: cx(
    'chat-dialog',
    css`
      overflow-y: scroll;
      height: 480px;
    `,
  ),
}));

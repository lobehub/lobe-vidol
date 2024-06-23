import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => ({
  dialog: cx(
    'chat-dialog',
    css`
      max-height: 640px;
    `,
  ),
}));

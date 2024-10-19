import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => ({
  dialog: cx(
    'chat-dialog',
    css`
      position: relative;
      max-height: 640px;
    `,
  ),
  close: css`
    position: absolute;
    z-index: 1;
    top: -12px;
    right: 24px;
  `,
}));

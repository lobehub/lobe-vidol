import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ cx, css }) => ({
  list: cx(
    'agent-list',
    css`
      width: 100%;
      height: 100%;
    `,
  ),
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  header: css`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  `,
}));

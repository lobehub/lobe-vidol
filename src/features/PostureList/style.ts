import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  list: css`
    position: relative;
    overflow-y: scroll;
    height: 100%;
  `,
}));

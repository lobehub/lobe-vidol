import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 128px);
  `,
}));

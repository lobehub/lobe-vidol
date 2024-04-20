import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
}));

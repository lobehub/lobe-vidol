import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  content: css`
    position: relative;

    display: flex;
    flex-direction: row;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
}));

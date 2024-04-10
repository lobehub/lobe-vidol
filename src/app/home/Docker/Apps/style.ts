import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  apps: css`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 48px);
    grid-template-rows: repeat(auto-fill, 48px);

    width: 420px;
  `,
}));

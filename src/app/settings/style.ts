import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  settings: css`
    overflow-y: auto;

    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 24px;
  `,
}));

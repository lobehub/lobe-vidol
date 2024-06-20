import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-bottom: 72px;
  `,
  edit: css`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  date: css`
    font-size: 12px;
  `,
  time: css`
    font-size: 12px;
  `,
  timer: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
}));

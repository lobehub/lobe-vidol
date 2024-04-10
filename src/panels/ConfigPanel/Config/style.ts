import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;

    width: 100%;
    padding-right: 24px;
    padding-left: 24px;
  `,

  content: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
}));

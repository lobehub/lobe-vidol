import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  chatBot: css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
}));

export { useStyles };

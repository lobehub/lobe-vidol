import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  chatBot: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `,
}));

export { useStyles };

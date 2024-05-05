import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    padding: ${token.paddingXS}px;
  `,
}));

export { useStyles };

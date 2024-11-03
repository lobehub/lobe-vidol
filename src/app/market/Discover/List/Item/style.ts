import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    font-size: ${token.fontSize}px;
    border-radius: ${token.borderRadius}px;
  `,
}));

export { useStyles };

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    font-size: ${token.fontSize}px;
    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
    transition: background-color 0.3s ease;
  `,
}));

export { useStyles };

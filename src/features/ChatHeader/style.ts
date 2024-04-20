import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 16px 8px;

    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
}));

export { useStyles };

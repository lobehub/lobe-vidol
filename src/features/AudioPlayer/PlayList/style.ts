import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    background-color: transparent !important;
    backdrop-filter: blur(10px) !important;
    border-left: 1px solid ${token.colorBorder};
  `,
  body: css`
    padding: 0 !important;
  `,
  header: css`
    padding: 12px !important;
  `,
}));

export { useStyles };

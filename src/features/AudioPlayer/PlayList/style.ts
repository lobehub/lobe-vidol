import { createStyles } from 'antd-style';
import { rgba } from 'polished';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    background-color: ${rgba(token.colorBgLayout, 0.8)} !important;
    backdrop-filter: saturate(180%) blur(10px);
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

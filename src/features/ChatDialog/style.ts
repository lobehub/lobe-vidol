import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token }) => ({
  dialog: css`
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: ${token.borderRadius}px;
  `,
}));

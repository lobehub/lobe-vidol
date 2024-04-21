import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token }) => ({
  dialog: css`
    padding: ${token.paddingSM}px;

    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
}));

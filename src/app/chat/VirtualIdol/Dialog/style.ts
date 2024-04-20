import { createStyles } from 'antd-style';
import { rgba } from 'polished';

const DIALOG_WIDTH = 720;

export const useStyles = createStyles(({ css, token }) => ({
  dialog: css`
    position: fixed;
    bottom: 64px;
    left: 50%;

    width: ${DIALOG_WIDTH}px;
    margin-bottom: ${token.marginSM}px;
    margin-left: ${-DIALOG_WIDTH / 2}px;
    padding: ${token.paddingSM}px;

    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
}));

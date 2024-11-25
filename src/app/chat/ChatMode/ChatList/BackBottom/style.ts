import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ token, css, cx }) => ({
  container: cx(css`
    pointer-events: none;

    position: absolute;
    z-index: 1000;
    right: 16px;
    bottom: 16px;
    transform: translateY(16px);

    padding-inline: 12px !important;

    opacity: 0;
    background: ${rgba(token.colorBgContainer, 0.5)};
    border-color: ${token.colorFillTertiary} !important;
    border-radius: 16px !important;
  `),
  visible: css`
    pointer-events: all;
    transform: translateY(0);
    opacity: 1;
  `,
}));

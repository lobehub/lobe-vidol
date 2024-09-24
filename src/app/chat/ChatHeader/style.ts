import { createStyles } from 'antd-style';
import { rgba } from 'polished';

import { CHAT_HEADER_HEIGHT } from '@/constants/token';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    height: ${CHAT_HEADER_HEIGHT}px;
    padding: ${token.paddingSM}px;
    background-color: ${rgba(token.colorBgLayout, 0.4)};
  `,
  player: css`
    min-width: 480px;
  `,
}));

export { useStyles };

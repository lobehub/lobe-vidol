import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT } from '@/constants/token';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    height: ${CHAT_HEADER_HEIGHT}px;
    border-bottom: 1px solid ${token.colorBorder};
  `,
  player: css`
    min-width: 480px;
  `,
}));

export { useStyles };

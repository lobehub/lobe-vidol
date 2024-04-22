import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT } from '@/constants/common';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    height: ${CHAT_HEADER_HEIGHT}px;
    padding: ${token.paddingSM}px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  player: css`
    min-width: 480px;
  `,
}));

export { useStyles };

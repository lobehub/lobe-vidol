import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  viewer: css`
    position: absolute;
    top: 0;
    left: 0;
  `,
  content: css`
    width: ${CHAT_INPUT_WIDTH};
    min-width: 480px;
    max-width: 100vw;

    @media (max-width: 1024px) {
      width: 100%;
    }
  `,
  dialog: css`
    position: absolute;
    z-index: 1;
    top: ${CHAT_HEADER_HEIGHT}px;
    left: 50%;
    transform: translateX(-50%);
  `,
  docker: css`
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    width: 100%;
    padding: ${token.paddingSM}px;
  `,
  input: css``,
}));

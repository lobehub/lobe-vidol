import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  header: css`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
  `,

  content: css`
    max-width: 100vw;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  list: css`
    width: ${CHAT_INPUT_WIDTH};
  `,
  input: css`
    width: ${CHAT_INPUT_WIDTH};
  `,
  dialog: css`
    position: absolute;
    z-index: 1;
    top: ${CHAT_HEADER_HEIGHT}px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
  `,
  docker: css`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: ${token.paddingSM}px;
  `,
}));

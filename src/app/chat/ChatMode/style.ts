import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  list: css`
    margin-top: ${CHAT_HEADER_HEIGHT}px;
  `,
  input: css`
    width: ${CHAT_INPUT_WIDTH};
    min-width: 480px;
    max-width: 100vw;

    @media (max-width: 1024px) {
      width: 100%;
    }
  `,

  docker: css`
    width: 100%;
    padding: ${token.paddingSM}px;
  `,
}));

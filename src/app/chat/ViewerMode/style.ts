import { createStyles } from 'antd-style';

import { CHAT_HEADER_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/token';

export const useStyles = createStyles(({ css, token }) => ({
  viewer: css`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  `,
  content: css`
    min-width: 480px;
    max-width: 100vw;

    @media (max-width: 1024px) {
      width: 100%;
    }
  `,
  dialog: css`
    z-index: 1;
    margin: ${CHAT_HEADER_HEIGHT}px auto 0;
  `,
  docker: css`
    width: 100%;
    padding: ${token.paddingSM}px;
  `,
  input: css`
    width: ${CHAT_INPUT_WIDTH};
  `,
  mask: css``,
}));

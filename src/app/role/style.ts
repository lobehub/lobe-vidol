import { createStyles } from 'antd-style';
import { rgba } from 'polished';

import { CHAT_INPUT_MIN_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    height: ${CHAT_INPUT_MIN_HEIGHT}px;
    padding: 0 ${token.paddingSM}px;
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
  `,
  content: css`
    width: ${CHAT_INPUT_WIDTH};
    max-width: 100vw;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,
  alert: css`
    margin-top: ${token.marginXS}px;
  `,
}));

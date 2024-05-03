import { createStyles } from 'antd-style';
import { rgba } from 'polished';

import { CHAT_INPUT_MIN_HEIGHT, CHAT_INPUT_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    height: ${CHAT_INPUT_MIN_HEIGHT}px;
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
  `,
  input: css`
    width: ${CHAT_INPUT_WIDTH};
  `,
  alert: css`
    margin-top: ${token.marginXS}px;
  `,
}));

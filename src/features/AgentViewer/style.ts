import { createStyles } from 'antd-style';

import {
  CHAT_HEADER_HEIGHT,
  CHAT_INPUT_HEIGHT,
  CHAT_INPUT_WIDTH,
  HEADER_HEIGHT,
} from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  toolbar: css`
    position: absolute;
    right: ${token.paddingMD}px;
    bottom: 50%;
    display: flex;
  `,
  dialog: css`
    position: absolute;
    top: ${token.paddingMD}px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;

    max-width: ${CHAT_INPUT_WIDTH};
  `,
  viewer: css`
    width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT}px - ${CHAT_HEADER_HEIGHT}px - ${CHAT_INPUT_HEIGHT}px);
  `,
}));

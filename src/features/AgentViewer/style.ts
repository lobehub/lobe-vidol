import { createStyles } from 'antd-style';

import {
  CHAT_HEADER_HEIGHT,
  CHAT_INPUT_MIN_HEIGHT,
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
    min-height: 0;
  `,
  canvas: css`
    display: block;

    width: 100%;
    max-width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT}px - ${CHAT_HEADER_HEIGHT}px - ${CHAT_INPUT_MIN_HEIGHT}px);
    max-height: 100%;
  `,
}));

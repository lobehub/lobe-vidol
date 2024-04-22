import { createStyles } from 'antd-style';

import { CHAT_INPUT_HEIGHT } from '@/constants/common';

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

    min-width: 480px;
  `,
  viewer: css`
    width: 100%;
    height: calc(100vh - 128px - ${CHAT_INPUT_HEIGHT}px);
  `,
}));

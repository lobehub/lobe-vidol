import { createStyles } from 'antd-style';

import { CHAT_INPUT_HEIGHT } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    height: ${CHAT_INPUT_HEIGHT}px;
    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(2px);
  `,
  input: css`
    max-width: 42vw;
  `,
  alert: css`
    padding: ${token.marginXS}px;
    color: ${token.colorTextTertiary};
  `,
}));

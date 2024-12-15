import { createStyles } from 'antd-style';

import { CHAT_INPUT_WIDTH } from '@/constants/token';

export const useStyles = createStyles(({ css, token, responsive }) => ({
  header: css`
    padding: 0 ${token.paddingSM}px;
  `,
  list: css`
    position: relative;
    height: 100%;
  `,

  message: css`
    width: 100%;
    min-width: 360px;
    max-width: ${CHAT_INPUT_WIDTH};
    margin: 0 auto;

    ${responsive.mobile} {
      width: 100%;
    }
  `,
}));

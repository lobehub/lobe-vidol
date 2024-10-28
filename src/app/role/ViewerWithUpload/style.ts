import { createStyles } from 'antd-style';

import { ROLE_VIEWER_WIDTH } from '@/constants/common';
import { HEADER_HEIGHT } from '@/constants/token';

export const useStyles = createStyles(({ css, token }) => ({
  guide: css`
    cursor: pointer;
    width: ${ROLE_VIEWER_WIDTH}px;
    height: calc(100vh - ${HEADER_HEIGHT}px);
    border: 1px dashed ${token.colorBorderSecondary};
  `,
  icon: css`
    font-size: 48px;
    color: ${token.geekblue};
  `,
  info: css``,
  extra: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
}));

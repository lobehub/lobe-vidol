import { createStyles } from 'antd-style';

import { ROLE_VIEWER_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  guide: css`
    cursor: pointer;

    width: ${ROLE_VIEWER_WIDTH}px;
    height: 100%;
    min-height: 480px;

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

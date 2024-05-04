import { createStyles } from 'antd-style';

import { HEADER_HEIGHT } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  header: css`
    height: ${HEADER_HEIGHT}px;
    padding: ${token.paddingXS}px;
  `,
}));

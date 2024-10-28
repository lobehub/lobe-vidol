import { createStyles } from 'antd-style';

import { ROLE_VIEWER_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css, cx }) => ({
  preview: cx(
    'role-preview',
    css`
      overflow: auto;
      width: 100%;
    `,
  ),
  container: css`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    padding: 0 24px;
  `,
  model: css`
    width: ${ROLE_VIEWER_WIDTH}px;
    height: 100%;
  `,
}));

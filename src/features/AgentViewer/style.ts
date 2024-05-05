import { createStyles } from 'antd-style';

import { HEADER_HEIGHT } from '@/constants/common';

export const useStyles = createStyles(({ css, token }) => ({
  toolbar: css`
    position: absolute;
    right: ${token.paddingMD}px;
    bottom: 50%;
    display: flex;
  `,
  viewer: css`
    position: relative;
    min-height: 0;
  `,
  canvas: css`
    display: block;

    width: 100%;
    max-width: 100%;
    height: calc(100vh - ${HEADER_HEIGHT}px);
    max-height: 100%;
  `,
}));

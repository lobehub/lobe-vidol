import { createStyles } from 'antd-style';

import { HEADER_HEIGHT } from '@/constants/token';

export const useStyles = createStyles(({ css, token }) => ({
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  header: css`
    height: ${HEADER_HEIGHT}px;
    padding: ${token.paddingSM}px;
  `,
  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));

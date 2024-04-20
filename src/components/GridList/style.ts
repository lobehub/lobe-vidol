import { createStyles } from 'antd-style';

import { LIST_GRID_GAP, LIST_GRID_HEIGHT, LIST_GRID_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css }) => ({
  grid: css`
    width: 100%;
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 240px;
  `,
  list: css`
    display: grid;
    grid-auto-flow: row;
    grid-auto-rows: minmax(${LIST_GRID_HEIGHT}px, auto);
    grid-gap: ${LIST_GRID_GAP}px;
    grid-template-columns: repeat(auto-fill, minmax(${LIST_GRID_WIDTH}px, 1fr));
    justify-items: center;
  `,
}));

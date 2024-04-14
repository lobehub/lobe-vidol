import { createStyles } from 'antd-style';

import { LIST_GRID_GAP, LIST_GRID_HEIGHT, LIST_GRID_WIDTH } from '@/constants/common';

export const useStyles = createStyles(({ css }) => ({
  grid: css`
    width: 100%;
    height: 100%;
  `,
  loading: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 240px;
  `,
  list: css`
    overflow: auto;
    display: grid;
    grid-auto-flow: row;
    grid-gap: ${LIST_GRID_GAP}px;
    grid-template-columns: repeat(auto-fill, ${LIST_GRID_WIDTH}px);
    grid-template-rows: repeat(auto-fill, ${LIST_GRID_HEIGHT}px);
    justify-items: center;
  `,
}));

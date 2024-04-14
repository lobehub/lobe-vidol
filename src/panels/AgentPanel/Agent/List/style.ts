import { createStyles } from 'antd-style';

const GRID_WIDTH = 100;
const GRID_GAP = 4;
const GRID_HEIGHT = 100;

export const useStyles = createStyles(({ css }) => ({
  list: css`
    overflow: auto;
    display: grid;
    grid-auto-flow: row;
    grid-gap: ${GRID_GAP}px;
    grid-template-columns: repeat(auto-fill, ${GRID_WIDTH}px);
    grid-template-rows: repeat(auto-fill, ${GRID_HEIGHT}px);
    justify-items: center;
  `,
}));

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  volume: css`
    display: flex;
    align-items: center;
  `,
  volumeIcon: css`
    cursor: pointer;
    margin-right: 8px;
  `,
}));

export { useStyles };

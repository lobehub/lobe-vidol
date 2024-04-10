import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  toolbar: css`
    position: absolute;
    right: 24px;
    bottom: 50%;
    display: flex;
  `,
  viewer: css`
    position: relative;
    width: 100%;
    height: 100%;
  `,
}));

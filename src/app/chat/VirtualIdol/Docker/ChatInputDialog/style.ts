import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token }) => ({
  apps: css``,
  docker: css`
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 8px 12px;

    background-color: ${rgba(token.colorBgLayout, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
    border-top: 1px solid ${token.colorSplit};
  `,
  message: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  player: css``,
}));

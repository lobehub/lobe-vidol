import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  application: css`
    cursor: pointer;
    user-select: none;

    display: inline-flex;
    flex-direction: column;
    align-items: center;

    padding: 8px;

    border-radius: 2px;

    &:hover {
      background: ${token.colorBgTextHover};
    }
  `,
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  guide: css`
    cursor: pointer;

    display: flex;

    width: 100%;
    height: 100%;

    border: 1px dashed ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
  icon: css`
    font-size: 48px;
    color: ${token.geekblue};
  `,
  info: css``,
  extra: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  systemRole: css`
    white-space: break-spaces;
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
}));

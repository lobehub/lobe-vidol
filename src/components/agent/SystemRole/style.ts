import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  systemRole: css`
    padding: 16px 16px 24px;
    white-space: break-spaces;
  `,
}));

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  voice: css`
    cursor: pointer;
    transition: color 0.3s;
  `,
  voiceOn: css`
    color: ${token.colorLinkActive};
  `,
}));

export { useStyles };

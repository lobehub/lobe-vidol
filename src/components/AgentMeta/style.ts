import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    margin-left: ${token.marginSM}px;
    line-height: 1;
  `,
  desc: css`
    width: 480px;
    font-size: ${token.fontSizeSM}px;
    line-height: 18px;
    color: ${token.colorTextDescription};
  `,
  title: css`
    font-size: ${token.fontSize}px;
    font-weight: bold;
    line-height: 18px;
  `,
}));

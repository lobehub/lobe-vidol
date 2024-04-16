import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  chatBot: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 16px 8px;

    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  voice: css`
    cursor: pointer;
    transition: color 0.3s;
  `,
  voiceOn: css`
    color: ${token.colorLinkActive};
  `,
}));

export { useStyles };

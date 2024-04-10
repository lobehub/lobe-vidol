import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  chatbot: css`
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

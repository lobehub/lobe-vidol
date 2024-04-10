import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    position: fixed;

    display: flex;
    flex-direction: column;

    width: 900px;

    background-color: ${token.colorBgContainer};
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid #999;
    border-radius: ${token.borderRadius}px;
  `,
  button: css`
    cursor: pointer;

    width: 14px;
    height: 14px;
    margin-left: ${token.marginXS}px;

    border-radius: 8px;
  `,
  close: css`
    background-color: ${token['red-7']};
  `,
  container: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 640px;
  `,
  content: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;

    width: 100%;
    height: 100%;
  `,

  extra: css`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  `,
  header: css`
    cursor: move;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 32px;
    padding: 0 ${token.paddingXS}px;

    border-bottom: 1px solid #999;
  `,
  logo: css`
    flex: 1;
    justify-content: flex-start;
  `,
  max: css`
    background-color: ${token['green-7']};
  `,
  min: css`
    background-color: ${token['yellow-7']};
  `,

  title: css`
    flex: 1;
    font-weight: bold;
    text-align: center;
  `,
}));

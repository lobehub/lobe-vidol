import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, responsive }) => ({
  header: css`
    /* border-bottom: 1px solid ${token.colorBorder}; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
  `,
  leftSection: css`
    flex: 1;
    min-width: 0;
    margin-right: 16px;
  `,
  agentMetaWrapper: css`
    overflow: hidden;
    flex: 1;
    min-width: 0;
  `,
  actions: css`
    display: flex;
    flex-shrink: 0;
    align-items: center;

    ${responsive.mobile} {
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  `,
}));

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx }) => ({
  preview: cx(
    'role-preview',
    css`
      overflow: auto;
      width: 100%;
    `,
  ),
  container: css`
    width: 80rem;
    height: 100%;
    margin: 0 auto;
  `,
  edit: css`
    padding: 0 24px;
  `,
  model: css``,
}));

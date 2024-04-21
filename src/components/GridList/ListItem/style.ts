import { createStyles } from 'antd-style';
import { rgba } from 'polished';

interface ListItemProps {
  active: boolean;
  avatar: string;
}

export const useStyles = createStyles(({ css, token }, { active, avatar }: ListItemProps) => ({
  item: css`
    cursor: pointer;

    position: relative;

    width: 100%;
    height: 100%;

    background: url(${avatar}) no-repeat center center;
    background-size: cover;
    border: 2px solid ${active ? token.colorPrimary : token.colorBgContainer};
  `,
  avatar: css``,

  info: css`
    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 24px;
    padding: 4px;

    background-color: ${rgba(token.colorBgContainer, 0.8)};
    backdrop-filter: saturate(180%) blur(2px);
  `,
  title: css`
    font-size: ${token.sizeSM}px;
    line-height: 16px;
  `,
  check: css`
    font-size: ${token.sizeSM}px;
    color: ${token.colorSuccessText};
  `,
}));

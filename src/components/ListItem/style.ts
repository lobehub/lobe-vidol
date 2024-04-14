import { createStyles } from 'antd-style';
import { rgba } from 'polished';

interface ListItemProps {
  active: boolean;
  avatar: string;
}

export const useStyles = createStyles(({ css, token }, { active, avatar }: ListItemProps) => ({
  item: css`
    position: relative;

    width: 100%;
    height: 100%;

    background: url(${avatar}) no-repeat center center;
    background-size: cover;
    border: 2px solid ${active ? token.colorPrimary : token.colorFillTertiary};
  `,
  avatar: css``,

  title: css`
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 24px;
    padding: 4px;

    font-size: 12px;
    line-height: 16px;

    background-color: ${rgba(token.colorBgContainer, 0.8)};
    backdrop-filter: saturate(180%) blur(10px);
  `,
}));

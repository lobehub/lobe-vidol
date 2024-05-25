import { Icon, List } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { type LucideIcon } from 'lucide-react';
import { CSSProperties, ReactNode, memo } from 'react';

const { Item } = List;

const useStyles = createStyles(({ css, token, responsive }) => ({
  container: css`
    position: relative;
    padding-top: 16px;
    padding-bottom: 16px;
    border-radius: ${token.borderRadius}px;
    ${responsive.mobile} {
      border-radius: 0;
    }
  `,
  noHover: css`
    pointer-events: none;
  `,
}));

export interface ItemProps {
  active?: boolean;
  className?: string;
  hoverable?: boolean;
  icon: LucideIcon;
  label: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
}

const SettingItem = memo<ItemProps>(
  ({ label, icon, hoverable = true, onClick, style, className }) => {
    const { cx, styles } = useStyles();
    return (
      <Item
        active={false}
        avatar={<Icon icon={icon} size={{ fontSize: 20 }} />}
        className={cx(styles.container, !hoverable && styles.noHover, className)}
        style={style}
        onClick={onClick}
        title={label as string}
      ></Item>
    );
  },
);

export default SettingItem;

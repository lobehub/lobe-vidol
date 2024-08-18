import { Avatar, List, ListItemProps } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { createStyles } from 'antd-style';
import { memo, useMemo, useRef } from 'react';

const { Item } = List;

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      position: relative;

      margin-block: 2px;
      padding-right: 16px;
      padding-left: 8px;

      border-radius: ${token.borderRadius}px;
    `,
  };
});

const ListItem = memo<ListItemProps & { avatar: string }>(
  ({ avatar, active, showAction, actions, ...props }) => {
    const ref = useRef(null);
    const isHovering = useHover(ref);
    const { styles } = useStyles();

    const avatarRender = useMemo(
      () => <Avatar animation={isHovering} avatar={avatar} shape="circle" size={46} />,
      [isHovering, avatar],
    );

    return (
      <Item
        actions={actions}
        active={active}
        avatar={avatarRender}
        className={styles.container}
        ref={ref}
        showAction={actions && (isHovering || showAction)}
        {...(props as any)}
      />
    );
  },
);

export default ListItem;

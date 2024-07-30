import { Avatar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { MotionAnimation } from '@/types/touch';

interface ActionListItemProps {
  item: MotionAnimation;
}

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    height: 56px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(({ item }) => {
  const { styles } = useStyles();

  return (
    <ListItem
      key={item.id}
      className={classNames(styles.listItem)}
      description={item.description.slice(0, 120)}
      avatar={<Avatar src={item.avatar} shape="square" />}
      showAction={true}
      title={item.name}
      active={false}
    />
  );
});

export default TouchActionListItem;

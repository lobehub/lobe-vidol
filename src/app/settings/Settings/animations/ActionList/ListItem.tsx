import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { GenderEnum } from '@/types/agent';
import { MotionAnimation } from '@/types/touch';

interface ActionListItemProps {
  currentGender: GenderEnum;
  index: number;
  item: MotionAnimation;
}

const useStyles = createStyles(({ css, token }) => ({
  list: css`
    width: 100%;
  `,

  listItem: css`
    position: relative;

    height: 48px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(({ item, index, currentGender }) => {
  const { styles } = useStyles();

  return (
    <ListItem
      key={`${currentGender}_${item.name}_${index}`}
      className={classNames(styles.listItem)}
      showAction={true}
      title={item.name}
      active={false}
    />
  );
});

export default TouchActionListItem;

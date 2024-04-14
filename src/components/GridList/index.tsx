import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from './ListItem';
import { useStyles } from './style';

interface Item {
  avatar: string;
  id: string;
  name: string;
}

interface GridListProps {
  className?: string;
  isActivated?: (id: string) => boolean;
  items: Item[];
  onClick?: (id: string) => void;
  style?: React.CSSProperties;
}

const GridList = (props: GridListProps) => {
  const { items, className, style, onClick, isActivated } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(className, styles.list)} style={style}>
      {items.map((item) => {
        const { avatar, name, id } = item;
        return (
          <ListItem
            key={id}
            title={name}
            avatar={avatar}
            onClick={() => {
              if (onClick) onClick(id);
            }}
            active={isActivated ? isActivated(id) : false}
          />
        );
      })}
    </div>
  );
};

export default memo(GridList);

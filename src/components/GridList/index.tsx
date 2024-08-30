import classNames from 'classnames';
import React from 'react';

import SkeletonList from '@/components/SkeletonList';

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
  isChecked?: (id: string) => boolean;
  items: any[];
  loading?: boolean;
  onClick?: (id: string, item: Item) => void;
  style?: React.CSSProperties;
}

const GridList = (props: GridListProps) => {
  const { items, className, style, onClick, isActivated, isChecked, loading = false } = props;
  const { styles } = useStyles();

  const List = () => (
    <>
      {items.map((item) => {
        const { avatar, name, id } = item;
        return (
          <ListItem
            key={id}
            title={name}
            avatar={avatar}
            onClick={() => {
              if (onClick) onClick(id, item);
            }}
            active={isActivated ? isActivated(id) : false}
            checked={isChecked ? isChecked(id) : false}
          />
        );
      })}
    </>
  );

  return (
    <div className={classNames(className, styles.grid)} style={style}>
      {loading ? (
        <SkeletonList />
      ) : (
        <div className={styles.list}>
          <List />
        </div>
      )}
    </div>
  );
};

export default GridList;

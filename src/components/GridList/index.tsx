import { Icon } from '@lobehub/ui';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';

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
  items: Item[];
  loading?: boolean;
  onClick?: (id: string) => void;
  style?: React.CSSProperties;
}

const GridList = (props: GridListProps) => {
  const { items, className, style, onClick, isActivated, isChecked, loading = false } = props;
  const { styles } = useStyles();

  const Loading = () => (
    <Center gap={16} horizontal>
      <Icon icon={Loader2} spin />
    </Center>
  );

  const List = () =>
    items.map((item) => {
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
          checked={isChecked ? isChecked(id) : false}
        />
      );
    });

  return (
    <div className={classNames(className, styles.list)} style={style}>
      {loading ? <Loading /> : <List />}
    </div>
  );
};

export default memo(GridList);

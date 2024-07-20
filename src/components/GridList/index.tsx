import { Icon } from '@lobehub/ui';
import { Empty, Space } from 'antd';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
  empty?: {
    actions?: React.ReactNode[];
  };
  isActivated?: (id: string) => boolean;
  isChecked?: (id: string) => boolean;
  items: any[];
  loading?: boolean;
  onClick?: (id: string, item: Item) => void;
  style?: React.CSSProperties;
}

const GridList = (props: GridListProps) => {
  const {
    items,
    className,
    style,
    onClick,
    isActivated,
    isChecked,
    loading = false,
    empty,
  } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('common');

  const Loading = () => (
    <Center gap={16} horizontal className={styles.loading}>
      <Icon icon={Loader2} spin />
      {t('loading')}
    </Center>
  );

  const List = () => (
    <div className={styles.list}>
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
    </div>
  );

  const EmptyList = () => (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('noData')}>
      {empty?.actions ? <Space>{empty.actions}</Space> : null}
    </Empty>
  );

  return (
    <div className={classNames(className, styles.grid)} style={style}>
      {loading ? <Loading /> : items.length === 0 ? <EmptyList /> : <List />}
    </div>
  );
};

export default GridList;

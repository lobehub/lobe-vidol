import { Typography } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';

import { useStyles } from './style';

const { Text } = Typography;

interface AvatarProps {
  active?: boolean;
  avatar: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  title: string;
}

const ListItem = (props: AvatarProps) => {
  const { avatar, title, style, className, onClick, active = false } = props;
  const { styles } = useStyles({ active, avatar });
  return (
    <div style={style} className={classNames(className, styles.item)} onClick={onClick}>
      <div className={styles.avatar} />
      <Text ellipsis={{ tooltip: title }} className={styles.title}>
        {title}
      </Text>
    </div>
  );
};

export default memo(ListItem);

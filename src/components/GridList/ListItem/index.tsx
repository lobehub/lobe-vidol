import { CheckCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';

import { useStyles } from './style';

const { Text } = Typography;

interface AvatarProps {
  active?: boolean;
  avatar: string;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  title: string;
}

const ListItem = (props: AvatarProps) => {
  const { avatar, title, style, className, onClick, active = false, checked = false } = props;
  const { styles } = useStyles({ active, avatar });
  return (
    <div style={style} className={classNames(className, styles.item)} onClick={onClick}>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <Text ellipsis={{ tooltip: title }} className={styles.title}>
          {title}
        </Text>
        {checked ? <CheckCircleFilled className={styles.check} /> : null}
      </div>
    </div>
  );
};

export default memo(ListItem);

import { Avatar } from '@lobehub/ui';
import { Typography } from 'antd';
import React from 'react';

import { AgentMeta } from '@/types/agent';

import { useStyles } from './style';

interface AgentMetaProps {
  className?: string;
  meta?: AgentMeta;
  style?: React.CSSProperties;
}

export default (props: AgentMetaProps) => {
  const { styles, cx } = useStyles();
  const { meta, style, className } = props;
  const { avatar, name, description } = meta || {};

  return (
    <div className={cx(styles.container, className)} style={style}>
      <Avatar avatar={avatar} size={36} />
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
        <Typography.Text className={styles.desc} ellipsis>
          {description}
        </Typography.Text>
      </div>
    </div>
  );
};

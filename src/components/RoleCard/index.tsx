import { Avatar } from '@lobehub/ui';
import { useHover } from 'ahooks';
import React, { memo, useRef } from 'react';

import ListItem from '@/components/ListItem';
import { Agent } from '@/types/agent';

import { useStyles } from './style';

interface RoleCardProps {
  agent: Agent;
  onClick?: () => void;
}

const RoleCard = (props: RoleCardProps) => {
  const { agent, onClick } = props;
  const { styles } = useStyles();

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  return (
    <ListItem
      ref={hoverRef}
      onClick={() => {
        onClick?.();
      }}
      className={styles.listItem}
      avatar={
        <div style={{ position: 'relative' }}>
          <Avatar src={agent?.meta?.avatar} shape={'square'} size={72} />
        </div>
      }
      title={agent?.meta?.name}
      description={agent?.meta?.description}
      active={isHovered}
      addon={`By ${agent?.author}`}
    />
  );
};

export default memo(RoleCard);

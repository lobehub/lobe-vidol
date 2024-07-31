import { Avatar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { useGlobalStore } from '@/store/global';
import { MotionAnimation } from '@/types/touch';
import { fetchWithProgress } from '@/utils/fetch';

interface ActionListItemProps {
  item: MotionAnimation;
}

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    height: 64px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(({ item }) => {
  const { styles } = useStyles();
  const viewer = useGlobalStore((s) => s.viewer);

  return (
    <ListItem
      key={item.id}
      className={classNames(styles.listItem)}
      description={item.description.slice(0, 40)}
      avatar={<Avatar src={item.avatar} shape="square" />}
      showAction={false}
      onClick={async () => {
        if (item.url) {
          const blob = await fetchWithProgress(item.url);
          const url = window.URL.createObjectURL(blob);

          viewer.model?.loadFBX(url);
        }
      }}
      title={item.name}
      active={false}
    />
  );
});

export default TouchActionListItem;

import { Avatar } from '@lobehub/ui';
import { Progress } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { useLoadMotion } from '@/hooks/useLoadMotion';
import { useGlobalStore } from '@/store/global';
import { MotionAnimation } from '@/types/touch';

interface ActionListItemProps {
  item: MotionAnimation;
}

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    position: relative;

    height: 64px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
  progress: css`
    background-color: rgba(${token.colorBgLayout}, 0.8);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 100%;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(({ item }) => {
  const { styles } = useStyles();
  const viewer = useGlobalStore((s) => s.viewer);
  const { downloading, percent, fetchMotionUrl } = useLoadMotion();

  return (
    <ListItem
      key={item.id}
      className={classNames(styles.listItem)}
      description={item.description.slice(0, 40)}
      avatar={<Avatar src={item.avatar} shape="square" />}
      actions={[
        downloading ? (
          <Progress
            key={`progress-${item.id}`}
            type="circle"
            className={styles.progress}
            percent={Math.ceil(percent)}
            size={[32, 32]}
          />
        ) : null,
      ]}
      showAction={true}
      onClick={async () => {
        if (item.url) {
          const url = await fetchMotionUrl(item.id, item.url);
          viewer.model?.loadFBX(url);
        }
      }}
      title={item.name}
      active={false}
    />
  );
});

export default TouchActionListItem;

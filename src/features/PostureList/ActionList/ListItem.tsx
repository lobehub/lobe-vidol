import { Avatar } from '@lobehub/ui';
import { Progress, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
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
  description: css`
    overflow: hidden;

    width: 240px;

    font-size: 12px;
    line-height: 1.2;
    color: ${token.colorTextDescription};
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(({ item }) => {
  const { styles } = useStyles();
  const viewer = useGlobalStore((s) => s.viewer, isEqual);
  const { downloading, percent, fetchMotionUrl } = useLoadMotion();

  return (
    <ListItem
      key={item.id}
      className={classNames(styles.listItem)}
      description={
        <Typography.Text className={styles.description} ellipsis>
          {item.description}
        </Typography.Text>
      }
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

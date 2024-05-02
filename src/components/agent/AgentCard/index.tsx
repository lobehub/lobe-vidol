import { Avatar } from '@lobehub/ui';
import { Space, Tag } from 'antd';
import React from 'react';
import { Center } from 'react-layout-kit';

import { Agent } from '@/types/agent';

import { useStyles } from './style';

interface Props {
  actions?: React.ReactNode[];
  agent?: Agent;
  extra?: React.ReactNode;
}

export default (props: Props) => {
  const { styles, theme } = useStyles();

  const { actions = [], agent, extra } = props;
  const { meta } = agent || {};
  const { avatar, name, description, homepage } = meta || {};

  return (
    <Center className={styles.header} gap={16}>
      <Avatar
        avatar={avatar}
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={100}
      />
      <div className={styles.title}>
        {name}
        <Tag color="#108ee9" style={{ marginLeft: 8 }}>
          <a href={homepage} rel="noreferrer" target="_blank">
            主页
          </a>
        </Tag>
      </div>
      <div className={styles.desc}>{description}</div>
      {actions ? (
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
      ) : null}
      {extra}
    </Center>
  );
};

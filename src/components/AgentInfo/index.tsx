import { Agent } from '@/types/agent';
import { Avatar } from '@lobehub/ui';
import { Space, Tag } from 'antd';
import React, { memo } from 'react';
import { Center } from 'react-layout-kit';
import { useStyles } from './style';

interface AgentInfoProps {
  actions?: React.ReactNode[];
  agent?: Agent;
}

const AgentInfo = (props: AgentInfoProps) => {
  const { styles, theme } = useStyles();
  const { agent, actions = [] } = props;
  const { meta, systemRole } = agent || {};
  const { avatar, name, description, homepage } = meta || {};

  return (
    <div className={styles.container}>
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
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
      </Center>
      <div className={styles.footer}>
        <div className={styles.desc}>{systemRole}</div>
      </div>
    </div>
  );
};

export default memo(AgentInfo);

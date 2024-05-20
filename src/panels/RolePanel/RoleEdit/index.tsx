'use client';

import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React, { useState } from 'react';

import Info from './Info';
import Model from './Model';
import Role from './Role';
import Voice from './Voice';
import { useStyles } from './style';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { styles } = useStyles();
  const { className, style } = props;
  const [tab, setTab] = useState('info');

  return (
    <div className={classNames(styles.edit, className)} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'info',
              label: '基本信息',
            },
            {
              key: 'role',
              label: '角色设定',
            },
            {
              key: 'voice',
              label: '语音',
            },
            {
              key: 'model',
              label: '3D 模型',
            },
          ]}
          onChange={(key) => {
            setTab(key);
          }}
        />
      </div>
      <div className={styles.content}>
        {tab === 'info' ? <Info /> : null}
        {tab === 'role' ? <Role /> : null}
        {tab === 'voice' ? <Voice /> : null}
        {tab === 'model' ? <Model /> : null}
      </div>
    </div>
  );
};

export default RolePanel;

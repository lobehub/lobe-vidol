'use client';

import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React, { useState } from 'react';

import Touch from '../Touch';
import Info from './Info';
import Role from './SystemRole';
import Tachie from './Tachie';
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
              label: '系统角色',
            },
            {
              key: 'tachie',
              label: '头像和立绘',
            },
            {
              key: 'voice',
              label: '语音',
            },
            {
              key: 'touch',
              label: '触摸设置(TODO)',
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
        {tab === 'tachie' ? <Tachie /> : null}
        {tab === 'voice' ? <Voice /> : null}
        {tab === 'touch' ? <Touch /> : null}
      </div>
    </div>
  );
};

export default RolePanel;

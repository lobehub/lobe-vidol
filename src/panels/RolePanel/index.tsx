'use client';

import PanelContainer from '@/panels/PanelContainer';
import { TabsNav } from '@lobehub/ui';
import React, { useState } from 'react';
import Info from './Info';
import Role from './Role';
import Touch from './Touch';
import Voice from './Voice';
import { useStyles } from './style';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('info');

  return (
    <PanelContainer className={className} panelKey="role" style={style} title="编辑角色">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 24,
          paddingRight: 24,
          width: '100%',
        }}
      >
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
                key: 'touch',
                label: '触摸设置',
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
          {tab === 'touch' ? <Touch /> : null}
        </div>
      </div>
    </PanelContainer>
  );
};

export default RolePanel;

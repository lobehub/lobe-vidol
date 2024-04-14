'use client';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import React, { useState } from 'react';

import PanelContainer from '@/panels/PanelContainer';

import Dance from './Dance';
import Market from './Market';
import { useStyles } from './style';

interface DancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('dance');

  const { styles } = useStyles();

  const options = [
    { value: 'dance', label: '已订阅', icon: <BarsOutlined /> },
    { value: 'market', label: '发现', icon: <AppstoreOutlined /> },
  ];

  return (
    <PanelContainer
      className={className}
      panelKey="dance"
      style={style}
      title="跳舞"
      extra={<Segmented options={options} size="small" value={tab} onChange={setTab} />}
    >
      <div className={styles.content}>
        <div className={styles.content}>
          {tab === 'dance' ? <Dance setTab={setTab} /> : <Market />}
        </div>
      </div>
    </PanelContainer>
  );
};

export default DancePanel;

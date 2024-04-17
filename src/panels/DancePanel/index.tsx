'use client';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import React, { useState } from 'react';

import PanelContainer from '@/panels/PanelContainer';

import Dance from './Dance';
import Market from './Market';

interface DancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('dance');

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
      {tab === 'dance' ? <Dance setTab={setTab} /> : <Market />}
    </PanelContainer>
  );
};

export default DancePanel;

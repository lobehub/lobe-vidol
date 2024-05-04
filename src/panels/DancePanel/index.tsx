'use client';

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import AudioPlayer from '@/features/AudioPlayer';
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
      title="音乐与舞蹈"
      extra={<Segmented options={options} size="small" value={tab} onChange={setTab} />}
      footer={
        <Flexbox style={{ padding: 8 }} flex={1}>
          <AudioPlayer />
        </Flexbox>
      }
    >
      {tab === 'dance' ? <Dance setTab={setTab} /> : <Market />}
    </PanelContainer>
  );
};

export default DancePanel;

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import React, { useState } from 'react';

import PanelContainer from '@/panels/PanelContainer';

import Agent from './Agent';
import Market from './Market';
import { useStyles } from './style';

interface ControlPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('agent');
  const { styles } = useStyles();

  const options = [
    { value: 'agent', label: '已订阅', icon: <BarsOutlined /> },
    { value: 'market', label: '创意工坊', icon: <AppstoreOutlined /> },
  ];

  return (
    <PanelContainer
      className={className}
      panelKey="agent"
      style={style}
      title={<Segmented options={options} size="small" value={tab} onChange={setTab} />}
    >
      <div className={styles.content}>{tab === 'agent' ? <Agent /> : <Market />}</div>
    </PanelContainer>
  );
};

export default ControlPanel;

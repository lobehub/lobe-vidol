'use client';

import PanelContainer from '@/panels/PanelContainer';
import { useMarketStore } from '@/store/market';
import React from 'react';
import Agent from './Agent';
import Dance from './Dance';
import SideNav from './SideNav';
import { useStyles } from './style';

interface MarketPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const MarketPanel = (props: MarketPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const tab = useMarketStore((s) => s.tab);

  return (
    <PanelContainer className={className} panelKey="market" style={style} title="虚拟商店">
      <SideNav className="handle" />
      <div className={styles.content}>
        <Dance style={{ display: tab === 'dance' ? 'flex' : 'none' }} />
        <Agent style={{ display: tab === 'agent' ? 'flex' : 'none' }} />
      </div>
    </PanelContainer>
  );
};

export default MarketPanel;

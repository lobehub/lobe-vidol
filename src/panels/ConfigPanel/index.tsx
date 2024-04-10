'use client';

import PanelContainer from '@/panels/PanelContainer';
import React from 'react';
import Config from './Config';
import { useStyles } from './style';

interface ConfigPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ConfigPanel = (props: ConfigPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer className={className} panelKey="config" style={style} title="系统设置">
      <div className={styles.content}>
        <Config />
      </div>
    </PanelContainer>
  );
};

export default ConfigPanel;

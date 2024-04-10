'use client';

import PanelContainer from '@/panels/PanelContainer';
import React from 'react';
import Dance from './Dance';
import { useStyles } from './style';

interface DancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer className={className} panelKey="dance" style={style} title="舞蹈订阅">
      <div className={styles.content}>
        <Dance />
      </div>
    </PanelContainer>
  );
};

export default DancePanel;

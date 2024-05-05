import React from 'react';

import PanelContainer from '@/panels/PanelContainer';

import Market from './Market';
import { useStyles } from './style';

interface ControlPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer className={className} panelKey="market" style={style} title="发现">
      <div className={styles.content}>
        <Market />
      </div>
    </PanelContainer>
  );
};

export default ControlPanel;

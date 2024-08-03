import React from 'react';
import { useTranslation } from 'react-i18next';

import PanelContainer from '@/panels/PanelContainer';

import Agent from './Agent';
import { useStyles } from './style';

interface ControlPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { t } = useTranslation('chat');

  return (
    <PanelContainer className={className} panelKey="agent" style={style} title={t('selectRole')}>
      <div className={styles.content}>
        <Agent />
      </div>
    </PanelContainer>
  );
};

export default ControlPanel;

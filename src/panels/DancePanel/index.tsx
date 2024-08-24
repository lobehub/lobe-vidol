'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import PanelContainer from '@/panels/PanelContainer';

import Market from './Market';

interface DancePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const { t } = useTranslation('dance');

  return (
    <PanelContainer className={className} panelKey="dance" style={style} title={t('musicAndDance')}>
      <Market />
    </PanelContainer>
  );
};

export default DancePanel;

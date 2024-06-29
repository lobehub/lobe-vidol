'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import PanelContainer from '@/panels/PanelContainer';

import RoleEdit from './RoleEdit';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { style, className } = props;
  const { t } = useTranslation('panel');

  return (
    <PanelContainer className={className} panelKey="role" style={style} title={t('nav.role')}>
      <RoleEdit />
    </PanelContainer>
  );
};

export default RolePanel;

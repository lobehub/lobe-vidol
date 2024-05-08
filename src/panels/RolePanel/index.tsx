'use client';

import React from 'react';

import PanelContainer from '@/panels/PanelContainer';

import RoleEdit from './RoleEdit';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { style, className } = props;

  return (
    <PanelContainer className={className} panelKey="role" style={style} title="角色设定">
      <RoleEdit />
    </PanelContainer>
  );
};

export default RolePanel;

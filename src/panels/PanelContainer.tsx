'use client';

import React, { PropsWithChildren } from 'react';

import Panel from '@/components/Panel';
import { configSelectors, useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

interface PanelContainerProps {
  className?: string;
  extra?: React.ReactNode;
  panelKey: PanelKey;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  toolbar?: React.ReactNode;
}

const PanelContainer = (props: PropsWithChildren<PanelContainerProps>) => {
  const { style, className, panelKey, title, children, toolbar, extra } = props;
  const [panel, setPanel, focusPanel, closePanel] = useConfigStore((s) => [
    s.panel,
    s.setPanel,
    s.focusPanel,
    s.closePanel,
  ]);
  const zIndex = useConfigStore((s) => configSelectors.getPanelZIndex(s, panelKey));

  return (
    <Panel
      className={className}
      coordinates={panel[panelKey].coordinates}
      onClose={() => closePanel(panelKey)}
      onCoordinatesChange={(coordinates) => setPanel(panelKey, { coordinates })}
      onFocus={() => focusPanel(panelKey)}
      style={style}
      title={title}
      toolbar={toolbar}
      extra={extra}
      zIndex={zIndex}
    >
      {children}
    </Panel>
  );
};

export default PanelContainer;

'use client';

import React, { PropsWithChildren } from 'react';

import Panel from '@/components/Panel';
import { globalSelectors, useGlobalStore } from '@/store/global';
import { PanelKey } from '@/types/config';

import { PanelContext } from './PanelContext';

interface PanelContainerProps {
  className?: string;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  panelKey: PanelKey;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  toolbar?: React.ReactNode;
}

const PanelContainer = (props: PropsWithChildren<PanelContainerProps>) => {
  const { style, className, panelKey, title, children, toolbar, extra, footer } = props;
  const [panel, setPanel, focusPanel, closePanel] = useGlobalStore((s) => [
    s.panel,
    s.setPanel,
    s.focusPanel,
    s.closePanel,
  ]);
  const zIndex = useGlobalStore((s) => globalSelectors.getPanelZIndex(s, panelKey));

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
      footer={footer}
      extra={extra}
      zIndex={zIndex}
    >
      <PanelContext.Provider value={true}>{children}</PanelContext.Provider>
    </Panel>
  );
};

export default PanelContainer;

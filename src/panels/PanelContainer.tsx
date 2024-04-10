'use client';

import Panel from '@/components/Panel';
import { configSelectors, useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import React, { PropsWithChildren } from 'react';

interface PanelContainerProps {
  className?: string;
  panelKey: PanelKey;
  style?: React.CSSProperties;
  title?: string;
}

const PanelContainer = (props: PropsWithChildren<PanelContainerProps>) => {
  const { style, className, panelKey, title, children } = props;
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
      zIndex={zIndex}
    >
      {children}
    </Panel>
  );
};

export default PanelContainer;

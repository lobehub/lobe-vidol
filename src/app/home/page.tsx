'use client';

import Background from '@/app/home/Background';
import Dialog from '@/app/home/Dialog';
import Docker from '@/app/home/Docker';
import QuickSwitch from '@/app/home/QuickSwitch';
import VirtualIdol from '@/app/home/VirtualIdol';
import { apps } from '@/app/home/apps';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

const Desktop = () => {
  const [panel] = useConfigStore((s) => [s.panel]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
      <div style={{ height: 'calc(100vh - 64px - 64px)' }}>
        <VirtualIdol />
        {apps.map((app) => {
          const open = panel[app.key as PanelKey].open;
          const component = app.component;
          return open ? (
            <div key={app.key} style={{ display: 'flex' }}>
              {component}
            </div>
          ) : null;
        })}
      </div>
      <Docker />
      <QuickSwitch />
      <Dialog />
      <Background />
    </div>
  );
};

export default Desktop;

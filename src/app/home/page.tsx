'use client';

import Background from '@/app/home/Background';
import Dialog from '@/app/home/Dialog';
import Header from '@/app/home/Header';
import RoleSelect from '@/app/home/RoleSelect';
import VirtualIdol from '@/app/home/VirtualIdol';
import { apps } from '@/app/home/apps';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import Docker from './Docker';

const Desktop = () => {
  const [panel] = useConfigStore((s) => [s.panel]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
      <Header />
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
      <RoleSelect />
      <Dialog />
      <Background />
    </div>
  );
};

export default Desktop;

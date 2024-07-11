import { DancePanel, MarketPanel } from '@/panels';
import { useGlobalStore } from '@/store/global';
import { PanelKey } from '@/types/config';

export const apps = [
  {
    component: <DancePanel />,
    key: 'dance',
  },
  {
    component: <MarketPanel />,
    key: 'market',
  },
];

export default () => {
  const [panel] = useGlobalStore((s) => [s.panel]);

  return (
    <>
      {apps.map((app) => {
        const open = panel[app.key as PanelKey].open;
        const component = app.component;
        return (
          <div key={app.key} style={{ display: open ? 'flex' : 'none' }}>
            {component}
          </div>
        );
      })}
    </>
  );
};

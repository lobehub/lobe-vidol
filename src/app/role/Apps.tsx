import { MarketPanel, RolePanel } from '@/panels';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

export const apps = [
  {
    component: <MarketPanel />,
    key: 'market',
    label: '发现',
  },
  {
    component: <RolePanel />,
    key: 'role',
    label: '编辑',
  },
];

export default () => {
  const [panel] = useConfigStore((s) => [s.panel]);

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

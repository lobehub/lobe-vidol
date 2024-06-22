import { DancePanel, MarketPanel, PluginStorePanel } from '@/panels';
import { useGlobalStore } from '@/store/global';
import { PanelKey } from '@/types/config';

export const apps = [
  {
    component: <DancePanel />,
    key: 'dance',
    label: '跳舞',
  },
  {
    component: <MarketPanel />,
    key: 'market',
    label: '发现',
  },
  {
    component: <PluginStorePanel />,
    key: 'pluginStore',
    label: '插件商店',
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

import { apps } from '@/app/home/apps';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

export default () => {
  const [panel] = useConfigStore((s) => [s.panel]);

  return (
    <>
      {apps.map((app) => {
        const open = panel[app.key as PanelKey].open;
        const component = app.component;
        return open ? (
          <div key={app.key} style={{ display: 'flex' }}>
            {component}
          </div>
        ) : null;
      })}
    </>
  );
};

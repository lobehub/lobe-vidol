import { AgentPanel, DancePanel, RolePanel } from '@/panels';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

export const apps = [
  {
    component: <AgentPanel />,
    key: 'agent',
    label: '角色',
  },
  {
    component: <DancePanel />,
    key: 'dance',
    label: '跳舞',
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

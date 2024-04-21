import { AgentPanel, DancePanel, RolePanel } from '@/panels';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';

export const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    component: <AgentPanel />,
    key: 'agent',
    label: '角色',
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    component: <DancePanel />,
    key: 'dance',
    label: '跳舞',
  },

  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/black-nib.webp',
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

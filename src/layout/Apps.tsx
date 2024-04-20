import { AgentPanel, ChatPanel, ConfigPanel, DancePanel, RolePanel } from '@/panels';
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
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/speech-balloon.webp',
    component: <ChatPanel />,
    key: 'chat',
    label: '聊天',
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/black-nib.webp',
    component: <RolePanel />,
    key: 'role',
    label: '编辑',
  },
  {
    avatar: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/gear.webp',
    component: <ConfigPanel />,
    key: 'config',
    label: '设置',
  },
];

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

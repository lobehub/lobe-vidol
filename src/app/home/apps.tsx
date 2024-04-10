// @ts-ignore
import { AgentPanel, ChatPanel, ConfigPanel, DancePanel, MarketPanel, RolePanel } from '@/panels';

export const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    component: <AgentPanel />,
    key: 'agent',
    label: '角色订阅',
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    component: <DancePanel />,
    key: 'dance',
    label: '舞蹈',
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
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/convenience-store.webp',
    component: <MarketPanel />,
    key: 'market',
    label: '商店',
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

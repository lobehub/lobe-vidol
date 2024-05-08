import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MessageCircle, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const router = useRouter();
  const [unsubscribe] = useAgentStore((s) => [s.unsubscribe]);
  const currentAgent = useAgentStore((s) => s.getAgentById(id));
  const createSession = useSessionStore((s) => s.createSession);
  const removeSession = useSessionStore((s) => s.removeSession);

  const items: MenuProps['items'] = [
    {
      icon: <MessageCircle />,
      label: '开始聊天',
      key: 'chat',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        if (!currentAgent) return;
        createSession(currentAgent);
        router.push('/chat');
      },
    },
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: '删除角色',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            unsubscribe(id);
            removeSession(id);
          },
          okText: '删除',
          cancelText: '取消',
          title: '确认删除角色以及相关联的会话消息吗？删除后无法恢复, 请谨慎操作！',
        });
      },
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      onOpenChange={(open) => setOpen(open)}
      trigger={['click']}
    >
      <ActionIcon
        icon={MoreVertical}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};

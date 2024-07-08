import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MessageCircle, MoreVertical, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const [removeLocalAgent] = useAgentStore((s) => [s.removeLocalAgent]);
  const currentAgent = useAgentStore((s) => s.getAgentById(id));
  const createSession = useSessionStore((s) => s.createSession);

  const items: MenuProps['items'] = [
    {
      icon: <MessageCircle />,
      label: t('startChat'),
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
      label: t('delRole'),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            removeLocalAgent(id);
          },
          okText: t('actions.del'),
          cancelText: t('cancel'),
          title: t('delAlert'),
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

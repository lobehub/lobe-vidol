import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const [removeSession] = useSessionStore((s) => [s.removeSession]);

  const items: MenuProps['items'] = [
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: '删除对话',
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            removeSession(id);
          },
          title: '确认删除对话吗？删除后无法恢复, 请谨慎操作！',
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

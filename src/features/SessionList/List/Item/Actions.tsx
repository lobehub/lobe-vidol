import { ActionIcon } from '@lobehub/ui';
import { App, Dropdown, MenuProps } from 'antd';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

interface ActionsProps {
  id: string;
  setOpen: (open: boolean) => void;
}

export default (props: ActionsProps) => {
  const { id, setOpen } = props;
  const { modal } = App.useApp();
  const { t } = useTranslation('common');
  const [removeSession] = useSessionStore((s) => [s.removeSession]);

  const items: MenuProps['items'] = [
    {
      danger: true,
      icon: <Trash2 />,
      key: 'delete',
      label: t('delSession'),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        modal.confirm({
          centered: true,
          okButtonProps: { danger: true },
          onOk: () => {
            removeSession(id);
          },
          okText: t('actions.del'),
          cancelText: t('cancel'),
          title: t('delSessionAlert'),
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

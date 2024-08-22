import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Copy, Edit, ListRestart, RotateCcw, Trash } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatListActionsBar {
  copy: ActionIconGroupItems;
  del: ActionIconGroupItems;
  delAndRegenerate: ActionIconGroupItems;
  divider: { type: 'divider' };
  edit: ActionIconGroupItems;
  regenerate: ActionIconGroupItems;
}

export const useChatListActionsBar = (): ChatListActionsBar => {
  const { t } = useTranslation('chat');
  return useMemo(
    () => ({
      copy: {
        icon: Copy,
        key: 'copy',
        label: t('actions.copy'),
      },
      del: {
        danger: true,
        icon: Trash,
        key: 'del',
        label: t('actions.del'),
      },
      delAndRegenerate: {
        icon: ListRestart,
        key: 'delAndRegenerate',
        label: t('actions.delAndRegenerate'),
      },
      divider: {
        type: 'divider',
      },
      edit: {
        icon: Edit,
        key: 'edit',
        label: t('actions.edit'),
      },
      regenerate: {
        icon: RotateCcw,
        key: 'regenerate',
        label: t('actions.regenerate'),
      },
    }),
    [],
  );
};

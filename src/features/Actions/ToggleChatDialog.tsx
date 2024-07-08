import { ActionIcon } from '@lobehub/ui';
import { MessageCircle, MessageCircleOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [showChatDialog, toggleChatDialog] = useGlobalStore((s) => [
    s.showChatDialog,
    s.toggleChatDialog,
  ]);
  const { t } = useTranslation('layout');
  return (
    <ActionIcon
      icon={showChatDialog ? MessageCircleOff : MessageCircle}
      onClick={() => toggleChatDialog()}
      title={t('dialog')}
    />
  );
};

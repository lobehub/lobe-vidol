import { ActionIcon } from '@lobehub/ui';
import { MessageCircle, MessageCircleOff } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/common';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showChatDialog, toggleChatDialog] = useGlobalStore((s) => [
    s.showChatDialog,
    s.toggleChatDialog,
  ]);

  return (
    <ActionIcon
      icon={showChatDialog ? MessageCircleOff : MessageCircle}
      onClick={() => toggleChatDialog()}
      title={'对话框'}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};

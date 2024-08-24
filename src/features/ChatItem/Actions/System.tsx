import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { RenderAction } from '@/features/ChatItem/type';

const SystemActionsBar: RenderAction = ({ onActionClick }) => {
  const { t } = useTranslation('chat');
  const { del } = useChatListActionsBar({
    delete: t('actions.del'),
  });
  return (
    <ActionIconGroup dropdownMenu={[del]} items={[]} onActionClick={onActionClick} type="ghost" />
  );
};

export default memo(SystemActionsBar);

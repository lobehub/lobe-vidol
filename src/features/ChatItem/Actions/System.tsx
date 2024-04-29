import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';

const SystemActionsBar: RenderAction = ({ onActionClick }) => {
  const { del } = useChatListActionsBar({
    delete: '删除',
  });
  return (
    <ActionIconGroup dropdownMenu={[del]} items={[]} onActionClick={onActionClick} type="ghost" />
  );
};

export default memo(SystemActionsBar);

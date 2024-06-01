import { ActionIconGroup } from '@lobehub/ui';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';

const UserActionsBar: RenderAction = ({ onActionClick }) => {
  const { copy, divider, del, edit, regenerate } = useChatListActionsBar();
  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, divider, regenerate, del]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(UserActionsBar);

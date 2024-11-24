import { ActionIconGroup } from '@lobehub/ui';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';

const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => {
  const { copy, regenerate, divider, del, delAndRegenerate, edit, tts } = useChatListActionsBar();

  if (id === 'default') return;

  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, tts, divider, regenerate, delAndRegenerate, divider, del]}
      items={[copy, delAndRegenerate]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(AssistantActionsBar);

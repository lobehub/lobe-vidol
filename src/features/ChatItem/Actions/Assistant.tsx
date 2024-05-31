import { ActionIconGroup } from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { Play } from 'lucide-react';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';

const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => {
  const { copy, regenerate, divider, del, delAndRegenerate, edit } = useChatListActionsBar();

  if (id === 'default') return;

  const tts = {
    icon: Play,
    key: 'tts',
    label: '语音合成',
  } as ActionIconGroupItems;

  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, divider, tts, regenerate, delAndRegenerate, divider, del]}
      items={[edit, copy]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(AssistantActionsBar);

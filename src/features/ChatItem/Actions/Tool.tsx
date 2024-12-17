import { ActionIconGroup } from '@lobehub/ui';
import { memo } from 'react';

import type { RenderAction } from '@/features/ChatItem/type';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';

const ToolActionsBar: RenderAction = ({ id }) => {
  const { regenerate, del } = useChatListActionsBar();

  if (id === 'default') return;

  return (
    <ActionIconGroup
      items={[regenerate, del]}
      onActionClick={async (event) => {
        switch (event.key) {
          case 'regenerate': {
            // await reInvokeToolMessage(id);
            break;
          }

          case 'del': {
            // await deleteToolMessage(id);
            break;
          }
        }
      }}
      type="ghost"
    />
  );
};

export default memo(ToolActionsBar);

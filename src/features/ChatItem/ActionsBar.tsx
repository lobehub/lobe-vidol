import { ActionsBarProps } from '@/features/ChatItem/type';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionEvent, ActionIconGroup } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useCallback } from 'react';
import { renderActions, useActionsClick } from './Actions';

const ActionsBar = memo<ActionsBarProps>((props) => {
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar();
  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, regenerate, divider, del]}
      items={[regenerate, edit]}
      type="ghost"
      {...props}
    />
  );
});

interface ActionsProps {
  index: number;
  setEditing: (edit: boolean) => void;
}
const Actions = memo<ActionsProps>(({ index, setEditing }) => {
  const item = useSessionStore((s) => sessionSelectors.currentChats(s)[index], isEqual);
  const onActionsClick = useActionsClick();

  const handleActionClick = useCallback(
    async (action: ActionEvent) => {
      switch (action.key) {
        case 'edit': {
          setEditing(true);
        }
      }

      onActionsClick(action, item);
    },
    [item],
  );

  const RenderFunction = renderActions[item?.role] ?? ActionsBar;

  return <RenderFunction {...item} onActionClick={handleActionClick} />;
});

export default Actions;

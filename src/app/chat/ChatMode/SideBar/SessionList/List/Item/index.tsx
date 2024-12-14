import { memo, useMemo, useState } from 'react';

import { sessionSelectors, useSessionStore } from '@/store/session';

import ListItem from '../../ListItem';
import Actions from './Actions';

interface SessionItemProps {
  id: string;
  onClick: () => void;
}

const SessionItem = memo<SessionItemProps>(({ id, onClick }) => {
  const [open, setOpen] = useState(false);

  const [activeSessionId, getAgentById] = useSessionStore((s) => [
    s.activeId,
    sessionSelectors.getAgentById(s),
  ]);

  const { greeting, meta: { name = '', avatar = '', description = '' } = {} } =
    getAgentById(id) || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <ListItem
      actions={actions}
      active={activeSessionId === id}
      avatar={avatar || ''}
      description={greeting || description || ''}
      onClick={onClick}
      showAction={open}
      title={name}
    />
  );
});

export default SessionItem;

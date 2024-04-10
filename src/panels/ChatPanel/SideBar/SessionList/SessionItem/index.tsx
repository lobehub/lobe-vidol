import { sessionSelectors, useSessionStore } from '@/store/session';
import { memo, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import Actions from './Actions';
import ListItem from './ListItem';

interface SessionItemProps {
  id: string;
  onClick: () => void;
}

const SessionItem = memo<SessionItemProps>(({ id, onClick }) => {
  const [open, setOpen] = useState(false);
  const [active] = useSessionStore((s) => [s.activeId === id]);
  const [getAgentById, isDefaultAgent] = useSessionStore((s) => [
    sessionSelectors.getAgentById(s),
    sessionSelectors.isDefaultAgent(s),
  ]);

  const isDefault = isDefaultAgent(id);
  const agent = getAgentById(id);
  const { name, description, avatar } = agent?.meta || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <ListItem
      actions={isDefault ? null : actions}
      active={active}
      avatar={avatar || ''}
      description={description || agent?.systemRole}
      onClick={onClick}
      showAction={open}
      title={name}
    />
  );
}, shallow);

export default SessionItem;

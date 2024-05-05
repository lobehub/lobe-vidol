import { memo, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { sessionSelectors, useSessionStore } from '@/store/session';

import ListItem from '../../ListItem';
import Actions from './Actions';

interface SessionItemProps {
  id: string;
  onClick: () => void;
}

const SessionItem = memo<SessionItemProps>(({ id, onClick }) => {
  const [open, setOpen] = useState(false);
  const [active] = useSessionStore((s) => [s.activeId === id]);
  const [getAgentById, isDefaultAgent, getLastMessageByAgentId] = useSessionStore((s) => [
    sessionSelectors.getAgentById(s),
    sessionSelectors.isDefaultAgent(s),
    sessionSelectors.getLastMessageByAgentId(s),
  ]);

  const lastMessage = getLastMessageByAgentId(id);

  const isDefault = isDefaultAgent(id);
  const agent = getAgentById(id);
  const { name, avatar } = agent?.meta || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <ListItem
      actions={isDefault ? null : actions}
      active={active}
      avatar={avatar || ''}
      description={lastMessage?.content || agent?.greeting || ''}
      onClick={onClick}
      showAction={open}
      title={name}
    />
  );
}, shallow);

export default SessionItem;

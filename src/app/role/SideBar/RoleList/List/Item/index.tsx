import { memo, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { DEFAULT_AGENT_AVATAR_URL } from '@/constants/common';
import { useAgentStore } from '@/store/agent';

import ListItem from '../../ListItem';
import Actions from './Actions';

interface SessionItemProps {
  id: string;
  onClick: () => void;
}

const SessionItem = memo<SessionItemProps>(({ id, onClick }) => {
  const [open, setOpen] = useState(false);
  const [active] = useAgentStore((s) => [s.currentIdentifier === id]);
  const [getAgentById] = useAgentStore((s) => [s.getAgentById]);

  const agent = getAgentById(id);
  const { name, description, avatar } = agent?.meta || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <ListItem
      actions={actions}
      active={active}
      avatar={avatar || DEFAULT_AGENT_AVATAR_URL}
      description={description || agent?.systemRole}
      onClick={onClick}
      showAction={open}
      title={name}
    />
  );
}, shallow);

export default SessionItem;

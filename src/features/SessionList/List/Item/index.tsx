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
  const [active] = useSessionStore((s) => [s.activeId === id]);
  const agent = useSessionStore((s) => sessionSelectors.getAgentById(s)(id));

  const { name, avatar } = agent?.meta || {};

  const actions = useMemo(() => <Actions id={id} setOpen={setOpen} />, [id]);

  return (
    <ListItem
      actions={actions}
      active={active}
      avatar={avatar || ''}
      description={agent?.greeting || agent?.meta.description || ''}
      onClick={onClick}
      showAction={open}
      title={name}
    />
  );
});

export default SessionItem;

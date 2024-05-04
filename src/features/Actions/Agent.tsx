import { ActionIcon } from '@lobehub/ui';
import { Plus } from 'lucide-react';

import { useConfigStore } from '@/store/config';

// eslint-disable-next-line react/display-name
export default () => {
  const openPanel = useConfigStore((s) => s.openPanel);

  return <ActionIcon icon={Plus} onClick={() => openPanel('agent')} title={'新的会话'} />;
};

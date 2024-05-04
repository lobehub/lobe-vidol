import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';

import { useConfigStore } from '@/store/config';

// eslint-disable-next-line react/display-name
export default () => {
  const openPanel = useConfigStore((s) => s.openPanel);

  return <ActionIcon icon={PlusCircle} onClick={() => openPanel('agent')} title={'新的会话'} />;
};

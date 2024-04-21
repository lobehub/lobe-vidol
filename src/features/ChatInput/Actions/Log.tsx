import { ActionIcon } from '@lobehub/ui';
import { History } from 'lucide-react';

import { useConfigStore } from '@/store/config';

export default () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  return (
    <ActionIcon
      icon={History}
      onClick={() => {
        openPanel('chat');
      }}
      title={'聊天记录'}
    />
  );
};

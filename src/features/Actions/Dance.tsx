import { ActionIcon } from '@lobehub/ui';
import { Music } from 'lucide-react';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  return (
    <ActionIcon
      icon={Music}
      onClick={() => {
        openPanel('dance');
      }}
      title={'音乐与舞蹈'}
    />
  );
};

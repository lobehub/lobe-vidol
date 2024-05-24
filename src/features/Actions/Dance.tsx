import { ActionIcon } from '@lobehub/ui';
import { Music2 } from 'lucide-react';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);

  return (
    <ActionIcon
      icon={Music2}
      onClick={() => {
        openPanel('dance');
      }}
      title={'音乐与舞蹈'}
    />
  );
};

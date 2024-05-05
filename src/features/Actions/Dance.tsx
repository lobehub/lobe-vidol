import { ActionIcon } from '@lobehub/ui';
import { Music2 } from 'lucide-react';

import { useConfigStore } from '@/store/config';

export default () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

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

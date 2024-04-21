import { ActionIcon } from '@lobehub/ui';
import { Edit2 } from 'lucide-react';

import { useConfigStore } from '@/store/config';

export default () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  return (
    <ActionIcon
      icon={Edit2}
      onClick={() => {
        openPanel('role');
      }}
      title={'编辑角色'}
    />
  );
};

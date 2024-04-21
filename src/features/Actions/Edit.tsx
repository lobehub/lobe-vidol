import { ActionIcon } from '@lobehub/ui';
import { SquarePen } from 'lucide-react';

import { useConfigStore } from '@/store/config';

export default () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  return (
    <ActionIcon
      icon={SquarePen}
      onClick={() => {
        openPanel('role');
      }}
      title={'编辑角色'}
    />
  );
};

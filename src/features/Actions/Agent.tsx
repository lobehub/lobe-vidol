import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/common';
import { useAgentStore } from '@/store/agent';

export default () => {
  const createNewAgent = useAgentStore((s) => s.createNewAgent);
  return (
    <ActionIcon
      icon={PlusCircle}
      title={'新建角色'}
      size={DESKTOP_HEADER_ICON_SIZE}
      onClick={() => createNewAgent()}
    />
  );
};

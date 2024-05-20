import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useConfigStore } from '@/store/config';

export default () => {
  const openPanel = useConfigStore((s) => s.openPanel);

  return (
    <ActionIcon
      icon={PlusCircle}
      onClick={() => openPanel('market')}
      title={'发现'}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};

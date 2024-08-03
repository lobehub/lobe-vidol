import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);
  const { t } = useTranslation('panel');
  return (
    <ActionIcon
      icon={PlusCircle}
      onClick={() => {
        openPanel('dance');
      }}
      title={t('dance.musicAndDance')}
    />
  );
};

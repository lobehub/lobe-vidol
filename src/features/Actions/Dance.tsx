import { ActionIcon } from '@lobehub/ui';
import { Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';

export default () => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);
  const { t } = useTranslation('panel');
  return (
    <ActionIcon
      icon={Music}
      onClick={() => {
        openPanel('dance');
      }}
      title={t('dance.musicAndDance')}
    />
  );
};

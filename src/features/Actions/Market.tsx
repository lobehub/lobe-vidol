import { ActionIcon } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const openPanel = useGlobalStore((s) => s.openPanel);
  const { t } = useTranslation('features');
  return (
    <ActionIcon
      icon={PlusCircle}
      onClick={() => openPanel('market')}
      title={t('actions.market')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};

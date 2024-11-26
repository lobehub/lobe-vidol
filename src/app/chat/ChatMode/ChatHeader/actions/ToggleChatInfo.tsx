import { ActionIcon } from '@lobehub/ui';
import { Bot, ChevronsRight } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

export default () => {
  const [showAgentInfo, toggleAgentInfo] = useGlobalStore((s) => [
    s.showAgentInfo,
    s.toggleAgentInfo,
  ]);
  const { t } = useTranslation('chat');
  return (
    <ActionIcon
      icon={showAgentInfo ? ChevronsRight : Bot}
      onClick={() => toggleAgentInfo()}
      title={t('agentInfo')}
      size={DESKTOP_HEADER_ICON_SIZE}
    />
  );
};

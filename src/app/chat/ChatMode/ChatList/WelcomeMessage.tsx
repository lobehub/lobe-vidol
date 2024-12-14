import { ChatItem } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors/agent';

const WelcomeMessage = () => {
  const { t } = useTranslation('chat');
  const agent = useAgentStore((s) => agentSelectors.currentAgentItem(s));

  const meta = {
    avatar: agent?.meta.avatar,
    title: agent?.meta.name,
    description: agent?.meta.description,
  };

  const greeting = agent?.greeting || t('greet', { ns: 'welcome', name: agent?.meta.name });

  return (
    <ChatItem avatar={meta} editing={false} message={greeting} placement={'left'} type={'block'} />
  );
};
export default WelcomeMessage;

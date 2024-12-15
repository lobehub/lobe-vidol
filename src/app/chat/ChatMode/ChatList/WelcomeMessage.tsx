import React from 'react';
import { useTranslation } from 'react-i18next';

import ChatItem from '@/components/ChatItem';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors/agent';

import { useStyles } from './style';

const WelcomeMessage = () => {
  const { t } = useTranslation('chat');
  const agent = useAgentStore((s) => agentSelectors.currentAgentItem(s));
  const { styles } = useStyles();

  const meta = {
    avatar: agent?.meta.avatar,
    title: agent?.meta.name,
    description: agent?.meta.description,
  };

  const greeting = agent?.greeting || t('greet', { ns: 'welcome', name: agent?.meta.name });

  return (
    <ChatItem
      avatar={meta}
      editing={false}
      message={greeting}
      placement={'left'}
      type={'block'}
      className={styles.message}
    />
  );
};
export default WelcomeMessage;

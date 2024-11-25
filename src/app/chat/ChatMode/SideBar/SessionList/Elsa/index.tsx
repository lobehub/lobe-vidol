import { Space, Tag } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import useSessionContext from '@/hooks/useSessionContext';
import { useAgentStore } from '@/store/agent';

import ListItem from '../ListItem';

const Elsa = memo(() => {
  const { t } = useTranslation('common');
  const defaultAgent = useAgentStore((s) => s.defaultAgent);
  const { activeSessionId, switchSession } = useSessionContext();

  return (
    <ListItem
      onClick={() => switchSession(LOBE_VIDOL_DEFAULT_AGENT_ID)}
      active={activeSessionId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={defaultAgent.meta.avatar}
      title={
        <Space align={'center'}>
          {defaultAgent.meta.name}
          <Tag color="geekblue">{t('defaultAssistant')}</Tag>
        </Space>
      }
      description={defaultAgent.greeting || defaultAgent.meta.description || ''}
    />
  );
});

export default Elsa;

import { Space, Tag } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useAgentStore } from '@/store/agent';

import ListItem from '../../ListItem';

const V = memo(() => {
  const { t } = useTranslation('common');
  const [activeId, activateAgent, defaultAgent] = useAgentStore((s) => [
    s.currentIdentifier,
    s.activateAgent,
    s.defaultAgent,
  ]);

  return (
    <ListItem
      onClick={() => {
        activateAgent(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={defaultAgent.meta.avatar}
      title={
        <Space align={'center'}>
          {defaultAgent.meta.name}
          <Tag color="geekblue">{t('defaultAssistant')}</Tag>
        </Space>
      }
      description={defaultAgent.meta.description}
    />
  );
});

export default V;

import { Space, Tag } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LOBE_VIDOL_DEFAULT_AGENT, LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useAgentStore } from '@/store/agent';

import ListItem from '../../ListItem';

const DefaultAgent = memo(() => {
  const { t } = useTranslation('common');
  const [activeId, activateAgent] = useAgentStore((s) => [s.currentIdentifier, s.activateAgent]);

  return (
    <ListItem
      onClick={() => {
        activateAgent(LOBE_VIDOL_DEFAULT_AGENT_ID);
      }}
      active={activeId === LOBE_VIDOL_DEFAULT_AGENT_ID}
      avatar={LOBE_VIDOL_DEFAULT_AGENT.meta.avatar}
      title={
        <Space align={'center'}>
          {LOBE_VIDOL_DEFAULT_AGENT.meta.name}
          <Tag color="geekblue">{t('defaultAssistant')}</Tag>
        </Space>
      }
      description={LOBE_VIDOL_DEFAULT_AGENT.meta.description}
    />
  );
});

export default DefaultAgent;

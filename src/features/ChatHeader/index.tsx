import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentMeta from '@/components/agent/AgentMeta';
import Video from '@/features/Actions/Video';
import Voice from '@/features/Actions/Voice';
import { useGlobalStore } from '@/store/global';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);
  const [toggleChatSideBar] = useGlobalStore((s) => [s.toggleChatSideBar]);

  return (
    <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <Space>
        <Voice key={'voice'} />
        <Video key={'video'} />
        <ActionIcon
          icon={SlidersHorizontal}
          onClick={() => toggleChatSideBar()}
          title={'角色信息'}
        />
      </Space>
    </Flexbox>
  );
};

export default Header;

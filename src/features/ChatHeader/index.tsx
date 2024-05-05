import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
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
  const [showChatSidebar, toggleChatSideBar] = useGlobalStore((s) => [
    s.showChatSidebar,
    s.toggleChatSideBar,
  ]);

  return (
    <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <Space>
        <Voice key={'voice'} />
        <Video key={'video'} />
        <ActionIcon
          icon={showChatSidebar ? PanelRightClose : PanelRightOpen}
          onClick={() => toggleChatSideBar()}
          title={'侧边栏'}
        />
      </Space>
    </Flexbox>
  );
};

export default Header;

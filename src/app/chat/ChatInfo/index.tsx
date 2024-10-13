'use client';

import { DraggablePanel, TabsNav } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { rgba } from 'polished';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { CHAT_HEADER_HEIGHT, CHAT_INFO_MAX_WIDTH, CHAT_INFO_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import BackGround from './BackGroundList';
import ChatList from './ChatList';
import DanceList from './DanceList';
import MotionList from './MotionList';
import PostureList from './PostureList';
import StageList from './StageList';
import { Tab } from './type';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    position: relative;

    display: flex;
    flex-direction: column;

    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
  header: css`
    height: ${CHAT_HEADER_HEIGHT}px;
    border-bottom: 1px solid ${token.colorBorder};
  `,
  player: css`
    min-width: 480px;
  `,
}));

export default () => {
  const [showChatSidebar, setChatSidebar] = useGlobalStore((s) => [
    s.showChatSidebar,
    s.setChatSidebar,
  ]);

  const [tab, setTab] = useState<Tab>(Tab.ChatList);
  const { t } = useTranslation('chat');

  const { styles } = useStyles();

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      minWidth={CHAT_INFO_WIDTH}
      maxWidth={CHAT_INFO_MAX_WIDTH}
      mode={'fixed'}
      onExpandChange={(expand) => {
        setChatSidebar(expand);
      }}
      expand={showChatSidebar}
      placement={'right'}
    >
      <Flexbox justify={'space-between'} horizontal align={'center'} className={styles.header}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              label: t('info.chat'),
              key: Tab.ChatList,
            },
            {
              label: t('info.dance'),
              key: Tab.DanceList,
            },
            {
              label: t('info.motions'),
              key: Tab.Motions,
            },
            {
              label: t('info.posture'),
              key: Tab.Posture,
            },
            {
              label: t('info.background'),
              key: Tab.Background,
            },
            {
              label: t('info.stage'),
              key: Tab.Stage,
            },
          ]}
          onChange={(key) => {
            setTab(key as Tab);
          }}
        />
      </Flexbox>
      <Flexbox height={'calc(100vh - 128px)'}>
        {tab === Tab.ChatList && <ChatList />}
        {tab === Tab.DanceList && <DanceList />}
        {tab === Tab.Motions && <MotionList />}
        {tab === Tab.Posture && <PostureList />}
        {tab === Tab.Background && <BackGround />}
        {tab === Tab.Stage && <StageList />}
      </Flexbox>
    </DraggablePanel>
  );
};

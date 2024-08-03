'use client';

import { DraggablePanel, TabsNav } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { CHAT_HEADER_HEIGHT, CHAT_INFO_MAX_WIDTH, CHAT_INFO_WIDTH } from '@/constants/token';
import ChatList from '@/features/ChatList';
import MotionList from '@/features/MotionList';
import PlayList from '@/features/PlayList';
import PostureList from '@/features/PostureList';
import { useGlobalStore } from '@/store/global';

import { Tab } from './type';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    position: relative;
    display: flex;
    flex-direction: column;
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
  const { t } = useTranslation('features');

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
              key: Tab.PlayList,
            },
            {
              label: t('info.motions'),
              key: Tab.Motions,
            },
            {
              label: t('info.posture'),
              key: Tab.Posture,
            },
          ]}
          onChange={(key) => {
            setTab(key as Tab);
          }}
        />
      </Flexbox>{' '}
      <Flexbox height={'calc(100vh - 128px)'}>
        {tab === Tab.ChatList && <ChatList />}
        {tab === Tab.PlayList && <PlayList />}
        {tab === Tab.Motions && <MotionList />}
        {tab === Tab.Posture && <PostureList />}
      </Flexbox>
    </DraggablePanel>
  );
};

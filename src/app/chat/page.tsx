'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import Alert from '@/features/Alert';
import ChatDialog from '@/features/ChatDialog';
import ChatHeader from '@/features/ChatHeader';
import ChatInfo from '@/features/ChatInfo';
import MessageInput from '@/features/ChatInput/MessageInput';
import ChatList from '@/features/ChatList';
import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';

import SideBar from './SideBar';
import { useStyles } from './style';

const Chat = () => {
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);
  const [showChatDialog, setChatDialog] = useGlobalStore((s) => [
    s.showChatDialog,
    s.setChatDialog,
  ]);
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} height={'100%'} width={'100%'} horizontal>
      <SideBar />

      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <ChatHeader className={styles.header} />
        {viewerMode === true ? (
          <>
            <AgentViewer />
            {showChatDialog ? (
              <ChatDialog
                className={classNames(styles.dialog, styles.content)}
                setOpen={setChatDialog}
              />
            ) : null}
          </>
        ) : (
          <Flexbox className={styles.list} height={'100%'}>
            <ChatList />
          </Flexbox>
        )}
        <Flexbox align={'center'} width={'100%'} className={styles.docker} justify={'center'}>
          <div className={classNames(styles.content, styles.input)}>
            <MessageInput />
            <Alert style={{ marginTop: 8 }} />
          </div>
        </Flexbox>
      </Flexbox>
      <ChatInfo />
    </Flexbox>
  );
};

export default memo(Chat);

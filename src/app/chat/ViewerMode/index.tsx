'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import AgentViewer from '@/features/AgentViewer';
import Alert from '@/features/Alert';
import ChatDialog from '@/features/ChatDialog';
import MessageInput from '@/features/ChatInput/MessageInput';
import { useGlobalStore } from '@/store/global';

import { useStyles } from './style';

export default memo(() => {
  const [showChatDialog, setChatDialog] = useGlobalStore((s) => [
    s.showChatDialog,
    s.setChatDialog,
  ]);
  const { styles } = useStyles();

  return (
    <Flexbox flex={1} style={{ position: 'relative' }}>
      <AgentViewer className={styles.viewer} />
      {showChatDialog ? (
        <ChatDialog className={classNames(styles.dialog, styles.content)} setOpen={setChatDialog} />
      ) : null}

      <Flexbox align={'center'} className={styles.docker}>
        <div className={classNames(styles.input, styles.content)}>
          <MessageInput />
          <Alert style={{ marginTop: 8 }} />
        </div>
      </Flexbox>
    </Flexbox>
  );
});

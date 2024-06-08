'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { HEADER_HEIGHT } from '@/constants/token';
import AgentViewer from '@/features/AgentViewer';
import MessageInput from '@/features/MessageInput';
import { sessionSelectors, useSessionStore } from '@/store/session';

import ChatDialog from './ChatDialog';
import { useStyles } from './style';

export default memo(() => {
  const { styles } = useStyles();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  return (
    <Flexbox flex={1} style={{ position: 'relative' }}>
      {currentAgent ? (
        <div className={styles.viewer}>
          <AgentViewer height={`calc(100vh - ${HEADER_HEIGHT}px)`} agent={currentAgent} />
        </div>
      ) : null}
      <ChatDialog className={classNames(styles.dialog, styles.content)} />
      <Flexbox flex={1} className={styles.mask} />
      <Flexbox align={'center'} className={styles.docker}>
        <div className={classNames(styles.input, styles.content)}>
          <MessageInput />
        </div>
      </Flexbox>
    </Flexbox>
  );
});

'use client';

import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatDialog from '@/app/chat/CameraMode/ChatDialog';
import { HEADER_HEIGHT } from '@/constants/token';
import AgentViewer from '@/features/AgentViewer';
import { sessionSelectors, useSessionStore } from '@/store/session';

import Background from './Background';
import Operation from './Operation';
import Settings from './Settings';
import { useStyles } from './style';

export default memo(() => {
  const { styles } = useStyles();
  const [currentAgent, interactive] = useSessionStore(
    (s) => [sessionSelectors.currentAgent(s), s.interactive],
    isEqual,
  );

  return (
    <Flexbox
      flex={1}
      horizontal
      style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <Flexbox flex={1} style={{ position: 'relative' }}>
        {currentAgent ? (
          <div className={styles.viewer}>
            <AgentViewer
              height={`calc(100vh - ${HEADER_HEIGHT}px)`}
              agentId={currentAgent.agentId}
              interactive={interactive}
            />
          </div>
        ) : null}
        <ChatDialog className={classNames(styles.dialog, styles.content)} />
        <Flexbox flex={1} className={styles.mask} />
        <Flexbox align={'center'} className={styles.docker}>
          <Operation />
        </Flexbox>
      </Flexbox>
      <Settings />
      <Background />
    </Flexbox>
  );
});

'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import MessageInput from './MessageInput';
import SideBar from './SideBar';
import { useStyles } from './style';

const Chat = () => {
  const { styles } = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Flexbox flex={1} className={styles.chat} horizontal>
      <SideBar />
      <Flexbox flex={1} style={{ position: 'relative' }} height={'100%'} width={'100%'}>
        <ChatHeader
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            left: 0,
          }}
        />
        <ChatList />
        <Flexbox align={'center'} className={styles.docker} ref={ref}>
          <div className={classNames(styles.input)}>
            <MessageInput />
          </div>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Chat);

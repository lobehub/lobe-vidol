'use client';

import classNames from 'classnames';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatList from '@/features/ChatList';
import MessageInput from '@/features/MessageInput';

import { useStyles } from './style';

const Chat = () => {
  const { styles } = useStyles();
  const ref = React.useRef<HTMLDivElement>(null);
  // const background = useSessionStore((s) => sessionSelectors.currentAgent(s)?.meta?.cover);

  return (
    <Flexbox
      flex={1}
      className={styles.chat}
      // style={{ backgroundImage: `url(${background})` }}
    >
      <ChatList className={styles.list} />
      <Flexbox align={'center'} className={styles.docker} ref={ref}>
        <div className={classNames(styles.input)}>
          <MessageInput />
        </div>
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Chat);

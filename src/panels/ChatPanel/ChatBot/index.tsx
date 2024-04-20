import classNames from 'classnames';
import React, { memo } from 'react';

import ChatHeader from '@/features/ChatHeader';
import ChatInput from '@/features/ChatInput';
import ChatList from '@/features/ChatList';

import { useStyles } from './style';

interface ChatBotProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.chatBot, className)} style={style}>
      <div className={styles.content}>
        <ChatHeader />
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <ChatList />
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default memo(ChatBot);

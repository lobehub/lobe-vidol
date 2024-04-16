import classNames from 'classnames';
import React, { memo } from 'react';

import ChatInput from '@/features/ChatInput';

import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import SideBar from './SideBar';
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
      <SideBar />
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

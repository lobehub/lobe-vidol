import classNames from 'classnames';
import React, { memo } from 'react';
import ChatInput from '../../../features/ChatInput';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import { useStyles } from './style';

interface ChatBotProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatHeader />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <ChatList />
      </div>
      <ChatInput />
    </div>
  );
};

export default memo(ChatBot);

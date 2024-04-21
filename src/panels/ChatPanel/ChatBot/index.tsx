import classNames from 'classnames';
import React, { memo } from 'react';

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
        <ChatList />
      </div>
    </div>
  );
};

export default memo(ChatBot);

import classNames from 'classnames';
import React from 'react';

import ChatItem from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

interface DialogProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dialog = (props: DialogProps) => {
  const { styles } = useStyles();
  const { className, style } = props;
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s));
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  return lastAgentChatIndex !== -1 ? (
    <div className={classNames(styles.dialog, className)} style={style}>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={true}
        type="pure"
      />
    </div>
  ) : null;
};

export default Dialog;

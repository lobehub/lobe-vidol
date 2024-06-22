import { ActionIcon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Tooltip } from 'antd';
import { XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import ChatItem from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

interface DialogProps {
  className?: string;
  style?: React.CSSProperties;
}

const Dialog = (props: DialogProps) => {
  const { className, style } = props;
  const [currentChats, chatLoading] = useSessionStore((s) => [
    sessionSelectors.currentChatsWithGreetingMessage(s),
    !!s.chatLoadingId,
  ]);
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  const ref = React.useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);
  const { styles } = useStyles();

  const [showChatDialog, setChatDialog] = useState(false);

  useEffect(() => {
    if (chatLoading) setChatDialog(true);
  }, [chatLoading]);

  return lastAgentChatIndex !== -1 && showChatDialog ? (
    <Flexbox className={className} style={style} ref={ref} horizontal>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={false}
        type="pure"
        className={styles.dialog}
      />
      <Tooltip key="close" title="关闭">
        <ActionIcon
          icon={XIcon}
          onClick={() => setChatDialog(false)}
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </Tooltip>
    </Flexbox>
  ) : null;
};

export default Dialog;

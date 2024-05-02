import { ActionIcon } from '@lobehub/ui';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import React from 'react';

import ChatItem from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';

import { useStyles } from './style';

interface DialogProps {
  className?: string;
  setOpen?: (open: boolean) => void;
  style?: React.CSSProperties;
}

const Dialog = (props: DialogProps) => {
  const { styles } = useStyles();
  const { className, style, setOpen } = props;
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s));
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');

  const handleClose = () => {
    if (setOpen) setOpen(false);
  };
  return lastAgentChatIndex !== -1 ? (
    <div className={classNames(styles.dialog, className)} style={style}>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={true}
        type="pure"
      />
      <Tooltip key="close" title="关闭">
        <ActionIcon icon={XIcon} onClick={handleClose} />
      </Tooltip>
    </div>
  ) : null;
};

export default Dialog;

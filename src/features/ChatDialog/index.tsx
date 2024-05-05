import { ActionIcon } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import React from 'react';
import { Flexbox } from 'react-layout-kit';

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
  const currentChats = useSessionStore((s) => sessionSelectors.currentChatsWithGreetingMessage(s));
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  const ref = React.useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);

  const handleClose = () => {
    if (setOpen) setOpen(false);
  };
  return lastAgentChatIndex !== -1 ? (
    <Flexbox className={classNames(styles.dialog, className)} style={style} ref={ref} horizontal>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={false}
        type="pure"
      />
      <Tooltip key="close" title="关闭">
        <ActionIcon icon={XIcon} onClick={handleClose} style={{ opacity: isHovered ? 1 : 0 }} />
      </Tooltip>
    </Flexbox>
  ) : null;
};

export default Dialog;

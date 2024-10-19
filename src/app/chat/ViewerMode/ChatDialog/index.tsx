import { ActionIcon } from '@lobehub/ui';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const [currentChats, chatLoading] = useSessionStore(
    (s) => [sessionSelectors.currentChatsWithGreetingMessage(s), !!s.chatLoadingId],
    isEqual,
  );
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  const ref = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  const [showChatDialog, setChatDialog] = useState(true);

  useEffect(() => {
    if (chatLoading) setChatDialog(true);
  }, [chatLoading]);

  return lastAgentChatIndex !== -1 && showChatDialog ? (
    <Flexbox className={classNames(className, styles.dialog)} style={style} ref={ref} horizontal>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={true}
        type="pure"
      />
      <Tooltip key="close" title={t('close', { ns: 'common' })}>
        <ActionIcon icon={XIcon} onClick={() => setChatDialog(false)} className={styles.close} />
      </Tooltip>
    </Flexbox>
  ) : null;
};

export default Dialog;

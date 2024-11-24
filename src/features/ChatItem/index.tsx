import { createStyles } from 'antd-style';
import classNames from 'classnames';
import isEqual from 'fast-deep-equal';
import { ReactNode, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChatItem, { ChatItemProps } from '@/components/ChatItem';
import { CHAT_INPUT_WIDTH } from '@/constants/token';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { ChatMessage } from '@/types/chat';

import ActionsBar from './ActionsBar';
import { renderAvatarAddon } from './AvatarAddon';
import ErrorMessageExtra, { useErrorContent } from './Error';
import { renderMessages } from './Messages';

const useStyles = createStyles(({ css, prefixCls, responsive }) => ({
  message: css`
    width: 100%;
    min-width: 480px;
    max-width: ${CHAT_INPUT_WIDTH};
    margin: 0 auto;
    // prevent the textarea too long
    .${prefixCls}-input {
      max-height: 900px;
    }

    ${responsive.mobile} {
      width: 100%;
    }
  `,
}));

export interface ChatListItemProps {
  className?: string;
  id: string;
  index: number;
  showTitle?: boolean;
  type?: ChatItemProps['type'];
}

const Item = memo<ChatListItemProps>(
  ({ index, id, showTitle = false, type = 'block', className }) => {
    const { styles } = useStyles();
    const [editing, setEditing] = useState(false);
    const { t } = useTranslation('common');

    const item = useSessionStore((s) => {
      const chats = sessionSelectors.currentChatsWithGreetingMessage(s);

      if (index >= chats.length) return;

      return chats[index];
    }, isEqual);

    const [loading, updateMessageContent] = useSessionStore((s) => [
      s.chatLoadingId === id,
      s.updateMessage,
    ]);

    const RenderMessage = useCallback(
      ({ editableContent, data }: { data: ChatMessage; editableContent: ReactNode }) => {
        if (!item?.role) return;
        const RenderFunction = renderMessages[item.role] ?? renderMessages['default'];

        if (!RenderFunction) return;

        return <RenderFunction {...data} editableContent={editableContent} />;
      },
      [item?.role],
    );

    const AvatarAddon = useCallback(
      ({ data }: { data: ChatMessage }) => {
        if (!item?.role) return;
        let RenderFunction;
        if (renderAvatarAddon?.[item.role]) RenderFunction = renderAvatarAddon[item.role];

        if (!RenderFunction) return;
        return <RenderFunction {...data} />;
      },
      [item?.role],
    );

    const error = useErrorContent(item?.error);

    return (
      item && (
        <ChatItem
          actions={<ActionsBar index={index} setEditing={setEditing} />}
          avatar={item.meta}
          avatarAddon={<AvatarAddon data={item} />}
          className={classNames(styles.message, className)}
          editing={editing}
          error={error}
          errorMessage={<ErrorMessageExtra data={item} />}
          loading={loading}
          message={item.content}
          onChange={(value) => updateMessageContent(item.id, value)}
          onDoubleClick={(e) => {
            if (item.id === 'default' || item.error) return;
            if (item.role && ['assistant', 'user'].includes(item.role) && e.altKey) {
              setEditing(true);
            }
          }}
          onEditingChange={setEditing}
          placement={item.role === 'user' ? 'right' : 'left'}
          primary={item.role === 'user'}
          renderMessage={(editableContent) => (
            <RenderMessage data={item} editableContent={editableContent} />
          )}
          showTitle={showTitle}
          text={{
            cancel: t('cancel'),
            confirm: t('confirm'),
            edit: t('actions.edit'),
          }}
          time={item.updatedAt || item.createdAt}
          type={type}
        />
      )
    );
  },
);

export default Item;

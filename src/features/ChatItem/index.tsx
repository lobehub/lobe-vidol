import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { ChatMessage } from '@/types/chat';
import { AlertProps, ChatItem, ChatItemProps } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { ReactNode, memo, useCallback, useMemo, useState } from 'react';
import ActionsBar from './ActionsBar';
import ErrorMessageExtra, { getErrorAlertConfig } from './Error';
import { renderMessages } from './Messages';

const useStyles = createStyles(({ css, prefixCls }) => ({
  message: css`
    // prevent the textarea too long
    .${prefixCls}-input {
      max-height: 900px;
    }
  `,
}));

export interface ChatListItemProps {
  id: string;
  index: number;
  showTitle?: boolean;
  type?: ChatItemProps['type'];
}

const Item = memo<ChatListItemProps>(({ index, id, showTitle = false, type = 'block' }) => {
  const { styles } = useStyles();
  const [editing, setEditing] = useState(false);

  const item = useSessionStore((s) => {
    const chats = sessionSelectors.currentChats(s);

    if (index >= chats.length) return;

    return sessionSelectors.currentChats(s)[index];
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

  const error = useMemo<AlertProps | undefined>(() => {
    if (!item?.error) return;
    const messageError = item.error;

    const alertConfig = getErrorAlertConfig(messageError.type);

    return { message: messageError.message, ...alertConfig };
  }, [item?.error]);

  return (
    item && (
      <ChatItem
        actions={<ActionsBar index={index} setEditing={setEditing} />}
        avatar={item.meta}
        className={styles.message}
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
          cancel: '取消',
          confirm: '确定',
          edit: '编辑',
        }}
        time={item.updatedAt || item.createdAt}
        type={type}
      />
    )
  );
});

export default Item;

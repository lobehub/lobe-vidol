import ChatItem from '@/features/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useStyles } from './style';

const Dialog = () => {
  const { styles } = useStyles();
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s));
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  return lastAgentChatIndex !== -1 ? (
    <div className={styles.dialog}>
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

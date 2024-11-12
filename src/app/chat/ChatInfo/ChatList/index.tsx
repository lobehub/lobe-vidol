import { Flexbox } from 'react-layout-kit';

import ApiKeyForm from '@/features/ChatItem/Error/ApiKeyForm';

import ChatList from './VirtualizedList';

interface ConversationProps {
  mobile?: boolean;
}

const Conversation = ({ mobile }: ConversationProps) => {
  return (
    <Flexbox
      flex={1}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
      }}
      width={'100%'}
    >
      <ApiKeyForm id="api-key-form" />
      <ChatList mobile={mobile} />
    </Flexbox>
  );
};

export default Conversation;

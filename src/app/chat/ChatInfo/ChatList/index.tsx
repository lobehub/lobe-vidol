import { Flexbox } from 'react-layout-kit';

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
      <ChatList mobile={mobile} />
    </Flexbox>
  );
};

export default Conversation;

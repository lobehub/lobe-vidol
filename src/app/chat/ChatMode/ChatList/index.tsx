import dynamic from 'next/dynamic';
import { Flexbox } from 'react-layout-kit';

import SkeletonList from './SkeletonList';

interface ConversationProps {
  mobile?: boolean;
}

const Conversation = ({ mobile }: ConversationProps) => {
  const Loading = () => (
    <div style={{ margin: '0 auto' }}>
      <SkeletonList mobile={mobile} />
    </div>
  );

  const ChatList = dynamic(() => import('./VirtualizedList'), {
    ssr: false,
    loading: Loading,
  });

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

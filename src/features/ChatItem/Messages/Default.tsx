import { LOADING_FLAG } from '@/constants/common';
import { ChatMessage } from '@/types/chat';
import { ReactNode, memo } from 'react';
import BubblesLoading from './Loading';

export const DefaultMessage = memo<
  ChatMessage & {
    editableContent: ReactNode;
  }
>(({ id, editableContent, content }) => {
  if (content === LOADING_FLAG) return <BubblesLoading />;

  return <div id={id}>{editableContent}</div>;
});

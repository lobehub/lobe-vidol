import { memo } from 'react';

import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { ChatMessage } from '@/types/message';

import { RenderAvatarAddon } from '../type';
import TTS from './TTS';

export const AssistantAvatarAddon: RenderAvatarAddon = memo<ChatMessage>(({ content, id }) => {
  const loading = useSessionStore((s) => sessionSelectors.ttsLoading(s)(id));

  return <TTS content={content} id={id} loading={loading} />;
});

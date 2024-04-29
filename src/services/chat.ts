import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { speakCharacter } from '@/features/messages/speakCharacter';
import { configSelectors, useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { ChatMessage } from '@/types/chat';
import { ChatStreamPayload } from '@/types/openai/chat';

const createHeader = (header?: any) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());
  return {
    'Content-Type': 'application/json',
    [OPENAI_API_KEY]: config?.apikey || '',
    [OPENAI_END_POINT]: config?.endpoint || '',
    ...header,
  };
};

interface ChatCompletionPayload extends Partial<Omit<ChatStreamPayload, 'messages'>> {
  messages: ChatMessage[];
}

export const chatCompletion = async (payload: ChatCompletionPayload) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());
  const { messages } = payload;

  const postMessages = messages.map((m) => ({ content: m.content, role: m.role }));

  return await fetch('/api/chat/openai', {
    body: JSON.stringify({
      model: config?.model,
      ...payload,
      messages: postMessages,
    }),
    headers: createHeader(),
    method: 'POST',
  });
};

export const handleSpeakAi = async (message: string) => {
  const viewer = useViewerStore.getState().viewer;
  const currentAgent = sessionSelectors.currentAgent(useSessionStore.getState());

  speakCharacter(
    {
      emotion: 'aa',
      tts: {
        ...currentAgent?.tts,
        message: message,
      },
    },
    viewer,
  );
};

export const toogleVoice = async () => {
  const { toggleVoice, voiceOn } = useSessionStore.getState();
  if (voiceOn) {
    const viewer = useViewerStore.getState().viewer;
    viewer.model?.stopSpeak();
  }
  toggleVoice();
};

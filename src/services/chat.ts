import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { speakCharacter } from '@/features/messages/speakCharacter';
import { configSelectors, useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';

const createHeader = (header?: any) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());
  return {
    'Content-Type': 'application/json',
    [OPENAI_API_KEY]: config?.apikey || '',
    [OPENAI_END_POINT]: config?.endpoint || '',
    ...header,
  };
};

export const chatCompletion = async (payload: any) => {
  const config = configSelectors.currentOpenAIConfig(useConfigStore.getState());

  const res = await fetch('/api/chat/openai', {
    body: JSON.stringify({
      model: config?.model,
      ...payload,
    }),
    headers: createHeader(),
    method: 'POST',
  });
  return res;
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

import { OnActionsClick, RenderAction } from '@/features/ChatItem/type';
import { handleSpeakAi } from '@/services/chat';
import { useSessionStore } from '@/store/session';
import { LLMRoleType } from '@/types/llm';
import { copyToClipboard } from '@lobehub/ui';
import { App } from 'antd';
import { useCallback } from 'react';
import AssistantActionsBar from './Assistant';
import UserActionsBar from './User';

export const renderActions: Record<LLMRoleType, RenderAction> = {
  assistant: AssistantActionsBar,
  user: UserActionsBar,
};

export const useActionsClick = (): OnActionsClick => {
  const [deleteMessage, regenerateMessage] = useSessionStore((s) => [
    s.deleteMessage,
    s.regenerateMessage,
  ]);
  const { message } = App.useApp();

  return useCallback<OnActionsClick>(async (action, { id, content, error }) => {
    switch (action.key) {
      case 'copy': {
        await copyToClipboard(content);
        message.success('复制成功');
        break;
      }

      case 'del': {
        deleteMessage(id);
        break;
      }

      case 'regenerate': {
        regenerateMessage(id);
        // if this message is an error message, we need to delete it
        if (error) deleteMessage(id);
        break;
      }

      case 'delAndRegenerate': {
        regenerateMessage(id);
        deleteMessage(id);
        break;
      }

      case 'tts': {
        handleSpeakAi(content);
        break;
      }
    }
  }, []);
};

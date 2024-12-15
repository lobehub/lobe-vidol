import { copyToClipboard } from '@lobehub/ui';
import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { OnActionsClick, RenderAction } from '@/features/ChatItem/type';
import { useSessionStore } from '@/store/session';
import { LLMRoleType } from '@/types/llm';

import AssistantActionsBar from './Assistant';
import SystemActionBar from './System';
import ToolActionsBar from './Tool';
import UserActionsBar from './User';

export const renderActions: Record<LLMRoleType, RenderAction> = {
  assistant: AssistantActionsBar,
  user: UserActionsBar,
  system: SystemActionBar,
  tool: ToolActionsBar,
};

export const useActionsClick = (): OnActionsClick => {
  const [deleteMessage, regenerateMessage, ttsMessage] = useSessionStore((s) => [
    s.deleteMessage,
    s.regenerateMessage,
    s.ttsMessage,
  ]);
  const { message } = App.useApp();
  const { t } = useTranslation('chat');

  return useCallback<OnActionsClick>(async (action, { id, content, error }) => {
    switch (action.key) {
      case 'copy': {
        await copyToClipboard(content);
        message.success(t('actions.copySuccess'));
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
        ttsMessage(id, content);
        break;
      }
    }
  }, []);
};

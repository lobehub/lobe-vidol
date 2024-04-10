import { ChatMessage } from '@/types/chat';
import { LLMRoleType } from '@/types/llm';
import { produce } from 'immer';

export interface AddMessageAction {
  payload: {
    content: string;
    id: string;
    role: LLMRoleType;
  };
  type: 'ADD_MESSAGE';
}

export interface UpdateMessageAction {
  payload: {
    id: string;
    key: keyof ChatMessage;
    value: ChatMessage[keyof ChatMessage];
  };
  type: 'UPDATE_MESSAGE';
}

export interface DeleteMessageAction {
  payload: {
    id: string;
  };
  type: 'DELETE_MESSAGE';
}

export type MessageActionType = AddMessageAction | UpdateMessageAction | DeleteMessageAction;

export const messageReducer = (state: ChatMessage[], action: MessageActionType): ChatMessage[] => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      return produce(state, (draft) => {
        const { role, content, id } = action.payload;
        draft.push({
          content,
          createdAt: Date.now(),
          id,
          meta: {},
          role,
          updatedAt: Date.now(),
        });
      });
    }
    case 'UPDATE_MESSAGE': {
      return produce(state, (draft) => {
        const { key, id, value } = action.payload;
        const message = draft.find((item) => item.id === id);
        if (!message) return;

        // @ts-ignore
        message[key] = value;
        message.updatedAt = Date.now();
      });
    }
    case 'DELETE_MESSAGE': {
      return produce(state, (draft) => {
        const { id } = action.payload;
        const index = draft.findIndex((item) => item.id === id);
        if (index === -1) return;
        draft.splice(index, 1);
      });
    }
    default: {
      return produce(state, () => []);
    }
  }
};

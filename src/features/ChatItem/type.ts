import { ChatMessage } from '@/types/chat';
import { ActionEvent, ActionIconGroupProps } from '@lobehub/ui';
import { FC, ReactNode } from 'react';

export type ActionsBarProps = ActionIconGroupProps;

export type OnActionsClick = (action: ActionEvent, message: ChatMessage) => void;
export type RenderMessage = FC<ChatMessage & { editableContent: ReactNode }>;
export type RenderAction = FC<ActionsBarProps & ChatMessage>;

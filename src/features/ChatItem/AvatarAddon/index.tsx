import { RenderAvatarAddon } from '../type';
import { AssistantAvatarAddon } from './Assistant';

export const renderAvatarAddon: Record<string, RenderAvatarAddon> = {
  assistant: AssistantAvatarAddon,
  user: () => null,
};

export type LLMRoleType = 'user' | 'assistant' | 'system';

export interface LLMMessage {
  content: string;
  role: LLMRoleType;
}

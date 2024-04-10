export type LLMRoleType = 'user' | 'assistant';

export interface LLMMessage {
  content: string;
  role: LLMRoleType;
}

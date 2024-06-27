export type LLMRoleType = 'user' | 'assistant' | 'system';

export interface ChatModelCard {
  /**
   * only used in azure
   */
  deploymentName?: string;
  description?: string;
  /**
   * the name show for end user
   */
  displayName?: string;

  /**
   * whether model is enabled by default
   */
  enabled?: boolean;
  /**
   * whether model supports file upload
   */
  files?: boolean;
  /**
   * whether model supports function call
   */
  functionCall?: boolean;
  id: string;
  /**
   * whether model is custom
   */
  isCustom?: boolean;
  /**
   * whether model is legacy (deprecated but not removed yet)
   */
  legacy?: boolean;
  maxOutput?: number;
  /**
   * the context window (or input + output tokens limit)
   */
  tokens?: number;
  /**
   *  whether model supports vision
   */
  vision?: boolean;
}

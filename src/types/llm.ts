export type LLMRoleType = 'user' | 'assistant' | 'system';

/**
 * 聊天模型卡片接口
 */
export interface ChatModelCard {
  /**
   * 仅用于 Azure
   */
  deploymentName?: string;
  /**
   * 模型描述
   */
  description?: string;
  /**
   * 展示给终端用户的名称
   */
  displayName?: string;
  /**
   * 模型是否默认启用
   */
  enabled?: boolean;
  /**
   * 模型是否支持文件上传
   */
  files?: boolean;
  /**
   * 模型是否支持函数调用
   */
  functionCall?: boolean;
  /**
   * 模型 ID
   */
  id: string;
  /**
   * 模型是否为自定义
   */
  isCustom?: boolean;
  /**
   * 模型是否为旧版（已弃用但未移除）
   */
  legacy?: boolean;
  /**
   * 最大输出长度
   */
  maxOutput?: number;
  /**
   * 上下文窗口（或输入 + 输出 token 限制）
   */
  tokens?: number;
  /**
   * 模型是否支持视觉
   */
  vision?: boolean;
}

/**
 * 语言模型的设置参数
 */
export interface LLMParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 0.6
   */
  temperature?: number;
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number;
}

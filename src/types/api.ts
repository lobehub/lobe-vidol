/**
 * 错误类型枚举
 */
export enum ErrorTypeEnum {
  /** 缺少API密钥 */
  API_KEY_MISSING = 'API_KEY_MISSING',
  /** 服务器内部错误 */
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  /** OpenAI API错误 */
  OPENAI_API_ERROR = 'OPENAI_API_ERROR',
}

/**
 * API错误响应接口
 */
export interface APIErrorResponse {
  /** 响应体 */
  body: any;
  /** 错误类型 */
  errorType: ErrorTypeEnum;
  /** 是否成功 */
  success: boolean;
}

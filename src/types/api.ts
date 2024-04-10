export enum ErrorTypeEnum {
  API_KEY_MISSING = 'API_KEY_MISSING',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  OPENAI_API_ERROR = 'OPENAI_API_ERROR'
}

export interface APIErrorResponse {
  body: any;
  errorType: ErrorTypeEnum;
  success: boolean;
}

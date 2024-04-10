import { APIErrorResponse, ErrorTypeEnum } from '@/types/api';
import { ChatMessageError } from '@/types/chat';
import { message } from 'antd';

const getMessageByErrorType = (errorType: ErrorTypeEnum) => {
  const errorMap = {
    API_KEY_MISSING: 'OpenAI API Key 为空，请添加自定义 OpenAI API Key',
    INTERNAL_SERVER_ERROR: '服务器错误，请联系管理员',
    OPENAI_API_ERROR: 'OpenAI API 错误，请检查 OpenAI API Key 和 Endpoint 是否正确',
  };
  return errorMap[errorType] || 'unknown error';
};
/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (
  fetcher: () => Promise<Response>,
  handler: {
    onMessageError?: (error: ChatMessageError) => void;
    onMessageUpdate?: (text: string) => void;
  },
) => {
  const res = await fetcher();

  if (!res.ok) {
    const data = (await res.json()) as APIErrorResponse;

    handler.onMessageError?.({
      body: data.body,
      message: getMessageByErrorType(data.errorType),
      type: data.errorType,
    });
    message.error(getMessageByErrorType(data.errorType));
    return;
  }

  const returnRes = res.clone();

  const data = res.body;

  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder('utf8');

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: true });
    handler.onMessageUpdate?.(chunkValue);
  }

  return returnRes;
};

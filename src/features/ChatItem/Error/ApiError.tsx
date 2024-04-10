import { ChatMessage } from '@/types/chat';
import { memo } from 'react';
import ErrorJsonViewer from './ErrorJsonViewer';
import OpenAPIKey from './OpenAPIKey';

interface OpenAIError {
  code: 'invalid_api_key' | string;
  message: string;
  param?: any;
  type: string;
}

interface OpenAIErrorResponse {
  error: OpenAIError;
}

const OpenAiBizError = memo<ChatMessage>(({ error, id }) => {
  const errorBody: OpenAIErrorResponse = (error as any)?.body;

  const errorCode = errorBody.error?.code;

  if (errorCode === 'invalid_api_key') return <OpenAPIKey id={id} />;

  return <ErrorJsonViewer error={error} id={id} />;
});

export default OpenAiBizError;

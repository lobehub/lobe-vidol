import { ErrorTypeEnum } from '@/types/api';
import { ChatMessage, ChatMessageError } from '@/types/chat';
import type { AlertProps } from '@lobehub/ui';
import { memo } from 'react';
import ApiError from './ApiError';
import ErrorJsonViewer from './ErrorJsonViewer';
import OpenAPIKey from './OpenAPIKey';

export const getErrorAlertConfig = (errorType?: ErrorTypeEnum): AlertProps | undefined => {
  if (typeof errorType === 'string' && (errorType.includes('Biz') || errorType.includes('Invalid')))
    return {
      extraDefaultExpand: true,
      extraIsolate: true,
      type: 'warning',
    };

  switch (errorType) {
    case ErrorTypeEnum.OPENAI_API_ERROR:
    case ErrorTypeEnum.API_KEY_MISSING: {
      return {
        extraDefaultExpand: true,
        extraIsolate: true,
        type: 'warning',
      };
    }

    default: {
      return undefined;
    }
  }
};

const ErrorMessageExtra = memo<{ data: ChatMessage }>(({ data }) => {
  const error = data.error as ChatMessageError;
  if (!error?.type) return;

  switch (error.type) {
    case ErrorTypeEnum.API_KEY_MISSING: {
      return <OpenAPIKey id={data.id} />;
    }

    case ErrorTypeEnum.OPENAI_API_ERROR: {
      return <ApiError {...data} />;
    }

    default: {
      return <ErrorJsonViewer error={data.error} id={data.id} />;
    }
  }
});

export default ErrorMessageExtra;

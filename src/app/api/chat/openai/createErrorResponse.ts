import { ErrorTypeEnum } from '@/types/api';
import { NextResponse } from 'next/server';

const getStatusCode = (errorType: ErrorTypeEnum) => {
  switch (errorType) {
    case ErrorTypeEnum.API_KEY_MISSING: {
      return 401;
    }
    case ErrorTypeEnum.OPENAI_API_ERROR: {
      return 577;
    }
    default: {
      return 500;
    }
  }
};

export const createErrorResponse = (errorType: ErrorTypeEnum, body: any) => {
  const statusCode = getStatusCode(errorType);

  return NextResponse.json(
    {
      body,
      errorType,
      success: false,
    },
    { status: statusCode },
  );
};

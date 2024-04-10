import { OPENAI_API_KEY, OPENAI_END_POINT } from '@/constants/openai';
import { ErrorTypeEnum } from '@/types/api';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI, { ClientOptions } from 'openai';
import { createErrorResponse } from './createErrorResponse';

export const POST = async (req: Request) => {
  const payload = await req.json();
  const apiKey = (req.headers.get(OPENAI_API_KEY) as string) || process.env.OPENAI_API_KEY;
  const baseURL = (req.headers.get(OPENAI_END_POINT) as string) || process.env.OPENAI_PROXY_URL;

  if (!apiKey) {
    return createErrorResponse(ErrorTypeEnum.API_KEY_MISSING, 'openai api key missing');
  }
  const config: ClientOptions = {
    apiKey: apiKey,
    baseURL,
  };

  const openai = new OpenAI(config);

  const { model, messages } = payload;

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model,
      stream: true,
    });

    const stream = OpenAIStream(completion);

    return new StreamingTextResponse(stream);
  } catch (error) {
    // https://platform.openai.com/docs/guides/error-codes/api-errors
    if (error instanceof OpenAI.APIError) {
      let errorResult: any;

      // if error is definitely OpenAI APIError, there will be an error object
      if (error.error) {
        errorResult = error.error;
      }
      // Or if there is a cause, we use error cause
      // This often happened when there is a bug of the `openai` package.
      else if (error.cause) {
        errorResult = error.cause;
      }
      // if there is no other request error, the error object is a Response like object
      else {
        errorResult = { headers: error.headers, stack: error.stack, status: error.status };
      }
      return createErrorResponse(ErrorTypeEnum.OPENAI_API_ERROR, {
        error: errorResult,
      });
    } else {
      return createErrorResponse(ErrorTypeEnum.INTERNAL_SERVER_ERROR, JSON.stringify(error));
    }
  }
};

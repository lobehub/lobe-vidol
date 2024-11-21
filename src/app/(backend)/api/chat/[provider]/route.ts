import { createErrorResponse } from '@/app/(backend)/api/errorResponse';
import { checkAuth } from '@/app/(backend)/middleware/auth';
import { AgentRuntime, ChatCompletionErrorPayload } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/provider/chat';

import { initAgentRuntimeWithUserPayload } from '../agentRuntime';

export const runtime = 'edge';

export const POST = checkAuth(async (req: Request, { params, jwtPayload, createRuntime }) => {
  const { provider } = params;

  try {
    // ============  1. init chat model   ============ //
    let agentRuntime: AgentRuntime;
    if (createRuntime) {
      agentRuntime = createRuntime(jwtPayload);
    } else {
      agentRuntime = await initAgentRuntimeWithUserPayload(provider, jwtPayload);
    }

    // ============  2. create chat completion   ============ //
    const data = (await req.json()) as ChatStreamPayload;

    return await agentRuntime.chat(data);
  } catch (e) {
    const {
      errorType = ChatErrorType.InternalServerError,
      error: errorContent,
      ...res
    } = e as ChatCompletionErrorPayload;

    const error = errorContent || e;
    // track the error at server side
    console.error(`Route: [${provider}] ${errorType}:`, error);

    return createErrorResponse(errorType, { error, ...res, provider });
  }
});

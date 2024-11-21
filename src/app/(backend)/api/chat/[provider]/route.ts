import { createErrorResponse } from '@/app/(backend)/api/errorResponse';
import { checkAuth } from '@/app/(backend)/middleware/auth';
import { JWTPayload } from '@/constants/auth';
import { AgentRuntime, ChatCompletionErrorPayload } from '@/libs/agent-runtime';
import { ChatErrorType } from '@/types/fetch';
import { ChatStreamPayload } from '@/types/provider/chat';

import { initAgentRuntimeWithUserPayload } from '../agentRuntime';

export const runtime = 'edge';

export const POST = checkAuth(
  async (
    req: Request,
    {
      params,
      createRuntime,
    }: { createRuntime?: (payload: JWTPayload) => AgentRuntime; params: { provider: string } },
  ) => {
    const { provider } = params;

    const payload = (await req.json()) as JWTPayload;
    console.log('payload', payload);
    try {
      // ============  1. init chat model   ============ //
      let agentRuntime: AgentRuntime;
      if (createRuntime) {
        agentRuntime = createRuntime(payload);
      } else {
        agentRuntime = await initAgentRuntimeWithUserPayload(provider, payload);
      }

      // ============  2. create chat completion   ============ //
      return await agentRuntime.chat(payload as ChatStreamPayload);
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
  },
);

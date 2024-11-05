# Conversation API Implementation Logic

The large model AI implementation of LobeVidol primarily relies on OpenAI's API, including the core conversation API on the backend and the integration API on the frontend. Next, we will introduce the implementation ideas and code for both the backend and frontend.

#### TOC

- [Backend Implementation](#backend-implementation)
  - [Core Conversation API](#core-conversation-api)
  - [Conversation Result Processing](#conversation-result-processing)
- [Frontend Implementation](#frontend-implementation)
  - [Frontend Integration](#frontend-integration)
  - [Using Streaming to Get Results](#using-streaming-to-get-results)

## Backend Implementation

The following code removes authentication, error handling, and other logic, retaining only the core functionality.

### Core Conversation API

In `src/app/api/chat/openai/route.ts`, a method for handling POST requests is defined, which is mainly responsible for extracting the `OpenAIChatStreamPayload` type payload from the request body and creating an OpenAI instance using the `createBizOpenAI` function based on the request and model information. Subsequently, this method calls `createChatCompletion` to handle the actual conversation and return the response result. If an error occurs during the creation of the OpenAI instance, it directly returns an error response.

```ts
export const POST = async (req: Request) => {
  const payload = (await req.json()) as OpenAIChatStreamPayload;

  const openaiOrErrResponse = createBizOpenAI(req, payload.model);

  // if resOrOpenAI is a Response, it means there is an error, just return it
  if (openaiOrErrResponse instanceof Response) return openaiOrErrResponse;

  return createChatCompletion({ openai: openaiOrErrResponse, payload });
};
```

### Conversation Result Processing

In the `src/app/api/openai/chat/createChatCompletion.ts` file, the `createChatCompletion` method is primarily responsible for interacting with the OpenAI API to process conversation requests. It first preprocesses the messages in the payload, then sends an API request using the `openai.chat.completions.create` method, and converts the returned response into a streaming format using `OpenAIStream`. If an error occurs during the API call, the method generates and processes the corresponding error response.

```ts
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const createChatCompletion = async ({ payload, openai }: CreateChatCompletionOptions) => {
  // Preprocess messages
  const { messages, ...params } = payload;
  // Send API request
  try {
    const response = await openai.chat.completions.create(
      {
        messages,
        ...params,
        stream: true,
      } as unknown as OpenAI.ChatCompletionCreateParamsStreaming,
      { headers: { Accept: '*/*' } },
    );
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an OpenAI APIError
    if (error instanceof OpenAI.APIError) {
      let errorResult: any;
      // If the error is an OpenAI APIError, there will be an error object
      if (error.error) {
        errorResult = error.error;
      } else if (error.cause) {
        errorResult = error.cause;
      }
      // If there are no other request errors, the error object is similar to a Response object
      else {
        errorResult = { headers: error.headers, stack: error.stack, status: error.status };
      }
      console.error(errorResult);
      // Return error response
      return createErrorResponse(ChatErrorType.OpenAIBizError, {
        endpoint: openai.baseURL,
        error: errorResult,
      });
    }
    console.error(error);
    return createErrorResponse(ChatErrorType.InternalServerError, {
      endpoint: openai.baseURL,
      error: JSON.stringify(error),
    });
  }
};
```

## Frontend Implementation

### Frontend Integration

In the `src/services/chat.ts` file, we define the `ChatService` class. This class provides several methods to handle interactions with the OpenAI chat API.

The `createAssistantMessage` method is used to create a new assistant message. It accepts an object containing plugins, messages, and other parameters, as well as an optional `FetchOptions` object. This method merges the default proxy configuration with the provided parameters, preprocesses the messages and tools, and then calls the `getChatCompletion` method to obtain the chat completion task.

The `getChatCompletion` method is used to retrieve the chat completion task. It accepts an `OpenAIChatStreamPayload` object and an optional `FetchOptions` object. This method merges the default proxy configuration with the provided parameters and then sends a POST request to OpenAI's chat API.

The `processMessages` method is used to handle chat messages. It accepts an array of chat messages, an optional model name, and an optional array of tools. This method processes the message content, mapping the input `messages` array to an array of `OpenAIChatMessage` types, and if there are enabled tools, it adds the system role of the tools to the system message.

```ts
class ChatService {
  // Create a new assistant message
  createAssistantMessage(params: object, fetchOptions?: FetchOptions) {
    // Implementation details...
  }

  // Get chat completion task
  getChatCompletion(payload: OpenAIChatStreamPayload, fetchOptions?: FetchOptions) {
    // Implementation details...
  }

  // Process chat messages
  processMessages(messages: ChatMessage[], modelName?: string, tools?: Tool[]) {
    // Implementation details...
  }
}
```

### Using Streaming to Get Results

In the `src/utils/fetch.ts` file, we define the `fetchSSE` method, which uses a streaming method to fetch data. When a new data chunk is read, it calls the `onMessageHandle` callback function to process the data chunk, thereby achieving a typewriter output effect.

```ts
export const fetchSSE = async (fetchFn: () => Promise<Response>, options: FetchSSEOptions = {}) => {
  const response = await fetchFn();

  // If not ok, it indicates a request error
  if (!response.ok) {
    const chatMessageError = await getMessageError(response);

    options.onErrorHandle?.(chatMessageError);
    return;
  }

  const returnRes = response.clone();

  const data = response.body;

  if (!data) return;
  let output = '';
  const reader = data.getReader();
  const decoder = new TextDecoder();

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value, { stream: true });

    output += chunkValue;
    options.onMessageHandle?.(chunkValue);
  }

  await options?.onFinish?.(output);

  return returnRes;
};
```

This concludes the core implementation of the LobeVidol conversation API. With an understanding of these core codes, one can further expand and optimize the AI capabilities of LobeVidol.

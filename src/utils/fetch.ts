import { t } from 'i18next';

import { APIErrorResponse, ErrorTypeEnum } from '@/types/api';
import { ChatMessageError } from '@/types/chat';

const createSmoothMessage = (params: { onTextUpdate: (delta: string, text: string) => void }) => {
  let buffer = '';
  // why use queue: https://shareg.pt/GLBrjpK
  let outputQueue: string[] = [];

  // eslint-disable-next-line no-undef
  let animationTimeoutId: NodeJS.Timeout | null = null;
  let isAnimationActive = false;

  // when you need to stop the animation, call this function
  const stopAnimation = () => {
    isAnimationActive = false;
    if (animationTimeoutId !== null) {
      clearTimeout(animationTimeoutId);
      animationTimeoutId = null;
    }
  };

  // define startAnimation function to display the text in buffer smooth
  // when you need to start the animation, call this function
  const startAnimation = (speed = 2) =>
    new Promise<void>((resolve) => {
      if (isAnimationActive) {
        resolve();
        return;
      }

      isAnimationActive = true;

      const updateText = () => {
        // 如果动画已经不再激活，则停止更新文本
        if (!isAnimationActive) {
          clearTimeout(animationTimeoutId!);
          animationTimeoutId = null;
          resolve();
        }

        // 如果还有文本没有显示
        // 检查队列中是否有字符待显示
        if (outputQueue.length > 0) {
          // 从队列中获取前两个字符（如果存在）
          const charsToAdd = outputQueue.splice(0, speed).join('');
          buffer += charsToAdd;

          // 更新消息内容，这里可能需要结合实际情况调整
          params.onTextUpdate(charsToAdd, buffer);

          // 设置下一个字符的延迟
          animationTimeoutId = setTimeout(updateText, 16); // 16 毫秒的延迟模拟打字机效果
        } else {
          // 当所有字符都显示完毕时，清除动画状态
          isAnimationActive = false;
          animationTimeoutId = null;
          resolve();
        }
      };

      updateText();
    });

  const pushToQueue = (text: string) => {
    outputQueue.push(...text.split(''));
  };

  return {
    isAnimationActive,
    isTokenRemain: () => outputQueue.length > 0,
    pushToQueue,
    startAnimation,
    stopAnimation,
  };
};

const getMessageByErrorType = (errorType: ErrorTypeEnum) => {
  const errorMap = {
    API_KEY_MISSING: t('apiKeyMiss', { ns: 'error' }),
    INTERNAL_SERVER_ERROR: t('serverError', { ns: 'error' }),
    OPENAI_API_ERROR: t('openaiError', { ns: 'error' }),
  };
  return errorMap[errorType] || t('unknownError', { ns: 'error' });
};
/**
 * @description: 封装fetch请求，使用流式方法获取数据
 */
export const fetchSEE = async (
  fetcher: () => Promise<Response>,
  handler: {
    onAbort?: (text: string) => void;
    onMessageError?: (error: ChatMessageError) => void;
    onMessageUpdate?: (text: string) => void;
  },
) => {
  let output = '';

  const textController = createSmoothMessage({
    onTextUpdate: (delta, text) => {
      output = text;

      handler.onMessageUpdate?.(delta);
    },
  });

  try {
    const res = await fetcher();

    if (!res.ok) {
      const data = (await res.json()) as APIErrorResponse;

      handler.onMessageError?.({
        body: data.body,
        message: getMessageByErrorType(data.errorType),
        type: data.errorType,
      });
      return;
    }

    const returnRes = res.clone();

    const data = res.body;

    if (!data) return;

    textController.stopAnimation();

    const reader = data.getReader();
    const decoder = new TextDecoder('utf8');

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value, { stream: true });
      textController.pushToQueue(chunkValue);

      if (textController.isTokenRemain()) {
        await textController.startAnimation(15);
      }

      if (!textController.isAnimationActive) textController.startAnimation();
    }

    return returnRes;
  } catch (error: any) {
    if ((error as TypeError).name === 'AbortError') {
      textController.stopAnimation();
      handler.onAbort?.(output);
    } else {
      handler.onMessageError?.(error);
    }
  }
};

export const fetchWithProgress = async (
  url: string,
  handlers: {
    onProgress?: (loaded: number, total: number) => void;
  },
) => {
  const res = await fetch(url, {
    method: 'GET',
    // 禁用缓存，可能导致跨域问题
    cache: 'no-cache',
    // mode: 'no-cors',
  });

  if (!res.ok || !res.body) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const contentLength = res.headers.get('content-length');
  if (!contentLength) {
    throw new Error('Content-Length res header is missing');
  }

  const total = parseInt(contentLength, 10);
  let loaded = 0;

  const reader = res.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }

            loaded += value.byteLength;
            handlers.onProgress?.(loaded, total);

            controller.enqueue(value);
            push();
          })
          .catch((error) => {
            console.error(error);
            controller.error(error);
          });
      }
      push();
    },
  });

  const newResponse = new Response(stream);
  return newResponse.blob();
};

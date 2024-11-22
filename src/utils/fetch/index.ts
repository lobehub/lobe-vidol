export const fetchWithProgress = async (
  url: string,
  handlers?: {
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
            handlers?.onProgress?.(loaded, total);

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

export * from './fetchSSE';

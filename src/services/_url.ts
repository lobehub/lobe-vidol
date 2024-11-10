export const API_ENDPOINTS = {
  // oauth: '/api/auth',

  // proxy: '/webapi/proxy',

  // // assistant
  // assistantStore: '/webapi/assistant/store',
  // assistant: (identifier: string) => withBasePath(`/webapi/assistant/${identifier}`),

  // // plugins
  // gateway: '/webapi/plugin/gateway',
  // pluginStore: '/webapi/plugin/store',

  // // trace
  // trace: '/webapi/trace',

  // chat
  chat: (provider: string) => `/api/chat/${provider}`,
  chatModels: (provider: string) => `/api/chat/models/${provider}`,

  // image
  // images: (provider: string) => `/webapi/text-to-image/${provider}`,

  // STT
  stt: '/api/stt/openai',

  // TTS
  tts: '/api/tts/openai',
  edge: '/api/tts/edge',
  microsoft: '/api/tts/microsoft',
};

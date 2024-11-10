export default {
  common: {
    title: '通用设置',
    chat: {
      title: '聊天设置',
      avatar: {
        title: '头像',
        desc: '自定义头像',
      },
      nickName: {
        title: '昵称',
        desc: '自定义昵称',
        placeholder: '请输入昵称',
      },
    },
    theme: {
      title: '主题设置',
      locale: {
        title: '语言',
        desc: '自定义系统语言',
        auto: '跟随系统',
      },
      primaryColor: {
        title: '主题色',
        desc: '自定义主题色',
      },
      neutralColor: {
        title: '中性色',
        desc: '不同色彩倾向的灰阶自定义',
      },
      backgroundEffect: {
        title: '背景效果',
        desc: '自定义背景效果',
        glow: '光辉',
        none: '无背景',
      },
    },
    system: {
      title: '系统设置',
      clear: {
        title: '清除应用数据',
        desc: '将会清除所有会话数据，包括会话列表，角色列表、会话消息、舞蹈列表等',
        action: '立即清除',
        tip: '操作无法撤销，清除后数据将无法恢复，请慎重操作',
        success: '清除成功',
        alert: '确认清除所有会话消息?',
      },
      reset: {
        title: '重置系统设置',
        desc: '将会重置所有系统设置，包括主题设置、聊天设置、语言模型设置等',
        action: '立即重置',
        success: '重置成功',
        alert: '确认重置所有系统设置?',
        tip: '操作无法撤销，重置后数据将无法恢复，请慎重操作',
      },
      clearCache: {
        title: '清除数据缓存',
        desc: '将会清除应用下载的数据缓存, 包括角色的模型数据，语音数据，舞蹈的模型数据，音频数据等',
        action: '立即清除',
        tip: '操作无法撤销，清除后数据将需要重新下载，请慎重操作',
        success: '清除成功',
        alert: '确认清除所有缓存?',
        calculating: '计算缓存大小中...',
      },
    },
  },
  llm: {
    title: '语言模型',
    openai: {
      callError: '调用接口失败，请检查 APIKey 和接口代理地址是否设置正确',
      checkOk: '检查通过',
      title: 'OpenAI',
      apiKey: {
        title: 'API Key',
        desc: '请使用自己的 OpenAI Key',
      },
      proxy: {
        title: '接口代理地址',
        desc: 'http(s)://',
      },
    },
    check: {
      title: '连通性检查',
      action: '检查',
      desc: '检查 APIKey 和接口代理地址是否设置正确',
      error: '调用接口失败，请检查 APIKey 和接口代理地址是否设置正确',
      success: '检查通过',
    },
  },
  touch: {
    title: '触摸设定',
  },
  tts: {
    title: '语音设置',
    clientCall: {
      title: '客户端调用',
      desc: '启用后，将使用客户端调用语音合成服务，语音合成速度更快，但需要科学上网或具备访问外网的能力',
    },
  },
};

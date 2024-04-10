export type TTS_ENGINE = 'microsoft' | 'edge';

// TODO: 需要根据不同 API 进行适配
export const talkStyles = ['talk', 'happy', 'sad', 'angry', 'fear', 'surprised'] as const;

export type TalkStyle = (typeof talkStyles)[number];

export type TTS = {
  /**
   * TTS 引擎
   */
  engine?: TTS_ENGINE;
  /**
   * 多语音标识
   */
  locale?: string;
  /**
   * 消息
   */
  message?: string;
  /**
   * 音调
   */
  pitch?: number;
  /**
   * 速度
   */
  speed?: number;
  /**
   * 风格
   */
  style?: TalkStyle;
  /**
   * 语音模型
   */
  voice?: string;
};

export interface Voice {
  DisplayName: string;
  DisplayVoiceName: string;
  LocalName: string;
  PreviewSentence: string;
  ShortName: string;
  locale: string;
  localeZH: string;
}

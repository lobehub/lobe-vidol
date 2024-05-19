import { TTS } from '@/types/tts';

export const DEFAULT_TTS_PITCH = 1;
export const DEFAULT_TTS_SPEED = 1;

export const MAX_TTS_PITCH = 2;
export const MIN_TTS_PITCH = 0;
export const MAX_TTS_SPEED = 3;
export const MIN_TTS_SPEED = 0;
export const TTS_PITCH_STEP = 0.01;
export const TTS_SPEED_STEP = 0.01;

export const DEFAULT_TTS_CONFIG: TTS = {
  engine: 'edge',
  locale: 'zh-CN',
  pitch: DEFAULT_TTS_PITCH,
  speed: DEFAULT_TTS_SPEED,
  voice: 'zh-CN-XiaoxiaoNeural',
};
export const supportedLocales = [
  {
    label: '中文(普通话)',
    sample: '正在为你准备我的整个世界',
    value: 'zh-CN',
  },
  {
    label: '日语(日本)',
    sample: 'あなたのために私の全世界を準備しています',
    value: 'ja-JP',
  },
  {
    label: '英语(美国)',
    sample: "I'm preparing my whole world for you.",
    value: 'en-US',
  },
  {
    label: '韩语(韩国)',
    sample: '당신을 위해 내 전 세계를 준비하고 있습니다.',
    value: 'ko-KR',
  },
  {
    label: '中文(粤语)',
    sample: '正在为您准备我的整个世界',
    value: 'zh-HK',
  },
];

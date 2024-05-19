import { TTS } from '@/types/tts';

export const DEFAULT_TTS_CONFIG: TTS = {
  engine: 'edge',
  locale: 'zh-CN',
  pitch: 1,
  speed: 1,
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

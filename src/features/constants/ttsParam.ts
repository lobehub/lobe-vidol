import { t } from 'i18next';

import { TTS } from '@/types/tts';

export const DEFAULT_TTS: TTS = {
  engine: 'edge',
  locale: 'zh-CN',
  message: t('waitting', { ns: 'welcome' }),
  pitch: 1,
  speed: 1,
  voice: 'zh-CN-XiaoyiNeural',
};

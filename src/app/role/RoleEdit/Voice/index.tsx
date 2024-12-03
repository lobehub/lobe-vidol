import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/constants/token';

import TTSEngine from './TTSEngine';
import TTSLocale from './TTSLocale';
import TTSPitch from './TTSPitch';
import TTSPlay from './TTSPlay';
import TTSSpeed from './TTSSpeed';
import TTSVoice from './TTSVoice';

export default () => {
  const { t } = useTranslation('role');

  const voice: FormProps['items'] = [
    {
      label: t('tts.engineLabel'),
      desc: t('tts.engineDescription'),
      name: 'engine',
      children: <TTSEngine />,
    },
    {
      label: t('tts.localeLabel'),
      desc: t('tts.localeDescription'),
      name: 'locale',
      children: <TTSLocale />,
    },
    {
      label: t('tts.voiceLabel'),
      desc: t('tts.voiceDescription'),
      name: 'voice',
      children: <TTSVoice />,
    },
    {
      label: t('tts.speedLabel'),
      desc: t('tts.speedDescription'),
      name: 'speed',
      children: <TTSSpeed />,
    },
    {
      label: t('tts.pitchLabel'),
      desc: t('tts.pitchDescription'),
      name: 'pitch',
      children: <TTSPitch />,
    },
    {
      label: t('tts.audition'),
      desc: t('tts.auditionDescription'),
      children: <TTSPlay />,
    },
  ];
  return <Form items={voice} itemsType={'flat'} variant={'block'} {...FORM_STYLE} />;
};

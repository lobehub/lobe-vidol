import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_M } from '@/constants/token';
import TTSEngine from '@/panels/RolePanel/RoleEdit/Voice/TTSEngine';
import TTSLocale from '@/panels/RolePanel/RoleEdit/Voice/TTSLocale';
import TTSPitch from '@/panels/RolePanel/RoleEdit/Voice/TTSPitch';
import TTSPlay from '@/panels/RolePanel/RoleEdit/Voice/TTSPlay';
import TTSSpeed from '@/panels/RolePanel/RoleEdit/Voice/TTSSpeed';
import TTSVoice from '@/panels/RolePanel/RoleEdit/Voice/TTSVoice';

export default () => {
  const { t } = useTranslation('panel');

  const voice: FormProps['items'] = [
    {
      label: t('tts.engineLabel'),
      desc: t('tts.engineDescription'),
      name: 'engine',
      children: <TTSEngine style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('tts.localeLabel'),
      desc: t('tts.localeDescription'),
      name: 'locale',
      children: <TTSLocale style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('tts.voiceLabel'),
      desc: t('tts.voiceDescription'),
      name: 'voice',
      children: <TTSVoice style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('tts.speedLabel'),
      desc: t('tts.speedDescription'),
      name: 'speed',
      children: <TTSSpeed style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('tts.pitchLabel'),
      desc: t('tts.pitchDescription'),
      name: 'pitch',
      children: <TTSPitch style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('tts.audition'),
      desc: t('tts.auditionDescription'),
      children: <TTSPlay style={{ width: INPUT_WIDTH_M }} />,
    },
  ];
  return <Form items={voice} itemsType={'flat'} variant={'block'} />;
};

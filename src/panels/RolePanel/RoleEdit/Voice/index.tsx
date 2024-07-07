import { Form, FormProps } from '@lobehub/ui';
import React from 'react';

import { INPUT_WIDTH_M } from '@/constants/token';
import TTSEngine from '@/panels/RolePanel/RoleEdit/Voice/TTSEngine';
import TTSLocale from '@/panels/RolePanel/RoleEdit/Voice/TTSLocale';
import TTSPitch from '@/panels/RolePanel/RoleEdit/Voice/TTSPitch';
import TTSPlay from '@/panels/RolePanel/RoleEdit/Voice/TTSPlay';
import TTSSpeed from '@/panels/RolePanel/RoleEdit/Voice/TTSSpeed';
import TTSVoice from '@/panels/RolePanel/RoleEdit/Voice/TTSVoice';

export default () => {
  const voice: FormProps['items'] = [
    {
      label: '引擎',
      desc: '语音合成引擎，建议优先选择 Edge ',
      name: 'engine',
      children: <TTSEngine style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '语言',
      desc: '语音合成的语种，当前仅支持最常见的几种语言，如有需要请联系',
      name: 'locale',
      children: <TTSLocale style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '语音',
      desc: '根据引擎和语种不同',
      name: 'voice',
      children: <TTSVoice style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '语速',
      desc: '控制语速，取值范围 0 ~ 3，默认为 1',
      name: 'speed',
      children: <TTSSpeed style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '音调',
      desc: '控制音调，取值范围 0 ~ 2，默认为 1',
      name: 'pitch',
      children: <TTSPitch style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '试听',
      desc: `试听文案根据语言不同`,
      children: <TTSPlay style={{ width: INPUT_WIDTH_M }} />,
    },
  ];
  return <Form items={voice} itemsType={'flat'} variant={'block'} />;
};

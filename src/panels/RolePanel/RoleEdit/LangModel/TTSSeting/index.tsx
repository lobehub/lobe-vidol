'use client';

import { Form, ItemGroup } from '@lobehub/ui';
import { Select } from 'antd';
import { memo } from 'react';

import { FORM_STYLE } from '@/constants/token';

const TTSSeting = memo(() => {
  const tts: ItemGroup = {
    children: [
      {
        children: <Select options={[{ label: '跟随系统', value: 'auto' }]} />,
        desc: '语音输入的语种，此选项可提高语音识别准确率',
        label: '语音识别语种',
        name: 'sttLocale',
      },
    ],
    title: '语音服务',
  };

  return <Form items={[tts]} itemsType={'group'} variant={'pure'} {...FORM_STYLE} />;
});

export default TTSSeting;

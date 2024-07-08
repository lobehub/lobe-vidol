'use client';

import { Form, FormProps, SliderWithInput } from '@lobehub/ui';
import React, { memo, useEffect } from 'react';

import { FORM_STYLE } from '@/constants/token';
import { agentSelectors, useAgentStore } from '@/store/agent';

import ModelSelect from './ModelSelect';

const LangModel = memo(() => {
  const [form] = Form.useForm();

  const { updateAgentConfig } = useAgentStore();

  const agent = agentSelectors.currentAgentItem(useAgentStore());

  useEffect(() => {
    form.setFieldsValue(agent);
  }, [agent]);

  const model: FormProps['items'] = [
    {
      children: <ModelSelect />,
      desc: 'ChatGPT 模型',
      label: '模型',
      name: 'model',
      tag: 'model',
    },
    {
      children: <SliderWithInput max={1} min={0} step={0.1} />,
      desc: '值越大，回复越随机',
      label: '随机性',
      name: ['params', 'temperature'],
      tag: 'temperature',
    },
    {
      children: <SliderWithInput max={1} min={0} step={0.1} />,
      desc: '与随机性类型，但不要和随机性一起更改',
      label: '核采样',
      name: ['params', 'top_p'],
      tag: 'top_p',
    },
    {
      children: <SliderWithInput max={2} min={-2} step={0.1} />,
      desc: '值越大，越有可能拓展到新话题',
      label: '话题新鲜度',
      name: ['params', 'presence_penalty'],
      tag: 'presence_penalty',
    },
    {
      children: <SliderWithInput max={2} min={-2} step={0.1} />,
      desc: '值越大，越有可能降低重复字词',
      label: '频率惩罚度',
      name: ['params', 'frequency_penalty'],
      tag: 'frequency_penalty',
    },
  ];

  return (
    <Form
      form={form}
      onValuesChange={(_, values) => updateAgentConfig(values)}
      items={model}
      itemsType={'flat'}
      variant={'block'}
      {...FORM_STYLE}
    />
  );
});

export default LangModel;

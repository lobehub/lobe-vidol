'use client';

import { Form, ItemGroup, SliderWithInput } from '@lobehub/ui';
import { memo, useEffect } from 'react';

import { FORM_STYLE } from '@/constants/token';
import { agentSelectors, useAgentStore } from '@/store/agent';

import ModelSelect from './ModelSelect';

const LangModel = memo(() => {
  const [form] = Form.useForm();

  const { updateChatModel } = useAgentStore();

  const agentChatModel = agentSelectors.currentAgentChatModel(useAgentStore.getState());

  useEffect(() => {
    form.setFieldsValue(agentChatModel);
  }, [agentChatModel]);

  const model: ItemGroup = {
    children: [
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
        name: 'temperature',
        tag: 'temperature',
      },
      {
        children: <SliderWithInput max={1} min={0} step={0.1} />,
        desc: '与随机性类型，但不要和随机性一起更改',
        label: '核采样',
        name: 'top_p',
        tag: 'top_p',
      },
      {
        children: <SliderWithInput max={2} min={-2} step={0.1} />,
        desc: '值越大，越有可能拓展到新话题',
        label: '话题新鲜度',
        name: 'presence_penalty',
        tag: 'presence_penalty',
      },
      {
        children: <SliderWithInput max={2} min={-2} step={0.1} />,
        desc: '值越大，越有可能降低重复字词',
        label: '频率惩罚度',
        name: 'frequency_penalty',
        tag: 'frequency_penalty',
      },
    ],
    title: '',
  };

  return (
    <Form
      form={form}
      onValuesChange={updateChatModel}
      items={[model]}
      itemsType={'group'}
      variant={'pure'}
      {...FORM_STYLE}
    />
  );
});

export default LangModel;

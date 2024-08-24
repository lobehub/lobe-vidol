'use client';

import { Form, FormProps, SliderWithInput } from '@lobehub/ui';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/constants/token';
import { agentSelectors, useAgentStore } from '@/store/agent';

import ModelSelect from './ModelSelect';

const LangModel = memo(() => {
  const [form] = Form.useForm();

  const { t } = useTranslation('role');

  const { updateAgentConfig } = useAgentStore();

  const agent = agentSelectors.currentAgentItem(useAgentStore());

  useEffect(() => {
    form.setFieldsValue(agent);
  }, [agent]);

  const model: FormProps['items'] = [
    {
      children: <ModelSelect />,
      desc: t('llm.modelDescription'),
      label: t('llm.modelLabel'),
      name: 'model',
      tag: 'model',
    },
    {
      children: <SliderWithInput max={1} min={0} step={0.1} />,
      desc: t('llm.temperatureDescription'),
      label: t('llm.temperatureLabel'),
      name: ['params', 'temperature'],
      tag: 'temperature',
    },
    {
      children: <SliderWithInput max={1} min={0} step={0.1} />,
      desc: t('llm.topPDescription'),
      label: t('llm.topPLabel'),
      name: ['params', 'top_p'],
      tag: 'top_p',
    },
    {
      children: <SliderWithInput max={2} min={-2} step={0.1} />,
      desc: t('llm.presencePenaltyDescription'),
      label: t('llm.presencePenaltyLabel'),
      name: ['params', 'presence_penalty'],
      tag: 'presence_penalty',
    },
    {
      children: <SliderWithInput max={2} min={-2} step={0.1} />,
      desc: t('llm.frequencyPenaltyDescription'),
      label: t('llm.frequencyPenaltyLabel'),
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

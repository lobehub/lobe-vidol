'use client';

import { Form, FormProps } from '@lobehub/ui';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import FrequencyPenalty from '@/app/role/RoleEdit/LangModel/FrequencyPenalty';
import ModelSelect from '@/app/role/RoleEdit/LangModel/ModelSelect';
import PresencePenalty from '@/app/role/RoleEdit/LangModel/PresencePenalty';
import Temperature from '@/app/role/RoleEdit/LangModel/Temperature';
import TopP from '@/app/role/RoleEdit/LangModel/TopP';
import { FORM_STYLE } from '@/constants/token';

const LangModel = memo(() => {
  const { t } = useTranslation('role');

  const model: FormProps['items'] = [
    {
      children: <ModelSelect />,
      desc: t('llm.modelDescription'),
      label: t('llm.modelLabel'),
      name: 'model',
      tag: 'model',
    },
    {
      children: <Temperature />,
      desc: t('llm.temperatureDescription'),
      label: t('llm.temperatureLabel'),
      name: ['params', 'temperature'],
      tag: 'temperature',
    },
    {
      children: <TopP />,
      desc: t('llm.topPDescription'),
      label: t('llm.topPLabel'),
      name: ['params', 'top_p'],
      tag: 'top_p',
    },
    {
      children: <PresencePenalty />,
      desc: t('llm.presencePenaltyDescription'),
      label: t('llm.presencePenaltyLabel'),
      name: ['params', 'presence_penalty'],
      tag: 'presence_penalty',
    },
    {
      children: <FrequencyPenalty />,
      desc: t('llm.frequencyPenaltyDescription'),
      label: t('llm.frequencyPenaltyLabel'),
      name: ['params', 'frequency_penalty'],
      tag: 'frequency_penalty',
    },
  ];

  return <Form items={model} itemsType={'flat'} variant={'block'} {...FORM_STYLE} />;
});

export default LangModel;

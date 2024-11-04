import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ClientCall from './ClientCall';

export default () => {
  const { t } = useTranslation('settings');

  const voice: FormProps['items'] = [
    {
      label: t('tts.clientCall.title'),
      desc: t('tts.clientCall.desc'),
      name: 'clientCall',
      children: <ClientCall />,
    },
  ];
  return <Form items={voice} itemsType={'flat'} variant={'block'} />;
};

import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/constants/token';

import Greeting from './Greeting';
import PreviewWithUpload from './PreviewWithUpload';
import ReadMe from './ReadMe';
import RoleCategory from './RoleCategory';
import RoleDescription from './RoleDescription';
import RoleGender from './RoleGender';
import RoleName from './RoleName';

const Info = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('role');

  const basic: FormProps['items'] = [
    {
      label: t('info.avatarLabel'),
      desc: t('info.avatarDescription'),
      name: 'avatar',
      children: <PreviewWithUpload />,
    },
    {
      label: t('info.nameLabel'),
      desc: t('info.nameDescription'),
      name: 'name',
      children: <RoleName />,
    },
    {
      label: t('info.descLabel'),
      desc: t('info.descDescription'),
      name: 'description',
      children: <RoleDescription />,
    },
    {
      label: t('info.greetLabel'),
      desc: t('info.greetDescription'),
      name: 'greeting',
      children: <Greeting />,
    },
    {
      label: t('info.genderLabel'),
      desc: t('info.genderDescription'),
      name: 'gender',
      children: <RoleGender />,
    },
    {
      label: t('info.categoryLabel'),
      desc: t('info.categoryDescription'),
      name: 'category',
      children: <RoleCategory />,
    },
    {
      label: t('info.readmeLabel'),
      desc: t('info.readmeDescription'),
      name: 'readme',
      children: <ReadMe />,
    },
  ];

  return <Form form={form} items={basic} itemsType={'flat'} variant={'block'} {...FORM_STYLE} />;
};

export default Info;

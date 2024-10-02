import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_LG, INPUT_WIDTH_MD } from '@/constants/token';

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
      children: <RoleName style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      label: t('info.descLabel'),
      desc: t('info.descDescription'),
      name: 'description',
      children: <RoleDescription style={{ width: INPUT_WIDTH_LG }} />,
    },
    {
      label: t('info.greetLabel'),
      desc: t('info.greetDescription'),
      name: 'greeting',
      children: <Greeting style={{ width: INPUT_WIDTH_LG }} />,
    },
    {
      label: t('info.genderLabel'),
      desc: t('info.genderDescription'),
      name: 'gender',
      children: <RoleGender style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      label: t('info.categoryLabel'),
      desc: t('info.categoryDescription'),
      name: 'category',
      children: <RoleCategory style={{ width: INPUT_WIDTH_MD }} />,
    },
    {
      label: t('info.readmeLabel'),
      desc: t('info.readmeDescription'),
      name: 'readme',
      children: <ReadMe style={{ width: INPUT_WIDTH_LG }} />,
    },
  ];

  return <Form form={form} variant="block" items={basic} itemsType={'flat'} />;
};

export default Info;

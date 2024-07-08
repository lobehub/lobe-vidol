import { Form, FormProps } from '@lobehub/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_L, INPUT_WIDTH_M } from '@/constants/token';
import Greeting from '@/panels/RolePanel/RoleEdit/Info/Greeting';
import PreviewWithUpload from '@/panels/RolePanel/RoleEdit/Info/PreviewWithUpload';
import ReadMe from '@/panels/RolePanel/RoleEdit/Info/ReadMe';
import RoleCategory from '@/panels/RolePanel/RoleEdit/Info/RoleCategory';
import RoleDescription from '@/panels/RolePanel/RoleEdit/Info/RoleDescription';
import RoleGender from '@/panels/RolePanel/RoleEdit/Info/RoleGender';
import RoleName from '@/panels/RolePanel/RoleEdit/Info/RoleName';

const Info = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('panel');

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
      children: <RoleName style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('info.descLabel'),
      desc: t('info.descDescription'),
      name: 'description',
      children: <RoleDescription style={{ width: INPUT_WIDTH_L }} />,
    },
    {
      label: t('info.greetLabel'),
      desc: t('info.greetDescription'),
      name: 'greeting',
      children: <Greeting style={{ width: INPUT_WIDTH_L }} />,
    },
    {
      label: t('info.genderLabel'),
      desc: t('info.genderDescription'),
      name: 'gender',
      children: <RoleGender style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('info.categoryLabel'),
      desc: t('info.categoryDescription'),
      name: 'category',
      children: <RoleCategory style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: t('info.readmeLabel'),
      desc: t('info.readmeDescription'),
      name: 'readme',
      children: <ReadMe style={{ width: INPUT_WIDTH_L }} />,
    },
  ];

  return <Form form={form} variant="block" items={basic} itemsType={'flat'} />;
};

export default Info;

import { Form, FormProps } from '@lobehub/ui';
import React from 'react';

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

  const basic: FormProps['items'] = [
    {
      label: '头像',
      desc: '自定义头像，点击自定义上传',
      name: 'avatar',
      children: <PreviewWithUpload />,
    },
    {
      label: '名称',
      desc: '角色名称，与角色聊天时的称呼',
      name: 'name',
      children: <RoleName style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '描述',
      desc: '角色描述，用于角色的简单介绍',
      name: 'description',
      children: <RoleDescription style={{ width: INPUT_WIDTH_L }} />,
    },
    {
      label: '招呼',
      desc: '与角色初次聊天时的招呼用语',
      name: 'greeting',
      children: <Greeting style={{ width: INPUT_WIDTH_L }} />,
    },
    {
      label: '性别',
      desc: '角色性别，影响角色的交互响应',
      name: 'gender',
      children: <RoleGender style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '类别',
      desc: '角色类别，用于展示分类',
      name: 'category',
      children: <RoleCategory style={{ width: INPUT_WIDTH_M }} />,
    },
    {
      label: '说明',
      desc: '角色的说明文件，用于发现页展示角色的详细说明',
      name: 'readme',
      children: <ReadMe style={{ width: INPUT_WIDTH_L }} />,
    },
  ];

  return <Form form={form} variant="block" items={basic} itemsType={'flat'} />;
};

export default Info;

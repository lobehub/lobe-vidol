import { Flex } from 'antd';
import React from 'react';

import ChatSetting from './ChatSetting';
import ModelSetting from './ModelSetting';
import TTSSeting from './TTSSeting';

const LangModel = () => {
  return (
    <Flex vertical gap={64}>
      <ModelSetting />
      <ChatSetting />
      <TTSSeting />
    </Flex>
  );
};

export default LangModel;

import { ActionIcon } from '@lobehub/ui';
import { Settings } from 'lucide-react';
import React, { useRef } from 'react';

import ChatSettingModal, { ChatSettingModalActionType } from './SettingModal';

const ChatSetting = () => {
  const actionRef = useRef<ChatSettingModalActionType>();

  return (
    <>
      <ActionIcon icon={Settings} title="偏好设置" onClick={() => actionRef.current?.config()} />
      <ChatSettingModal actionRef={actionRef} />
    </>
  );
};

export default ChatSetting;

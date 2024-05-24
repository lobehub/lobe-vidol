import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { text = '立即清除', type = 'primary' } = props;
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const clearSessions = useSessionStore((s) => s.clearSessions);
  const { message, modal } = App.useApp();

  const handleClear = () => {
    modal.confirm({
      cancelText: '取消',
      centered: true,
      content: '操作无法撤销，清除后数据将无法恢复，请慎重操作',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      onOk: () => {
        clearSessions();
        clearAgentStorage();
        message.success('清除成功');
      },
      title: '确认清除所有会话消息?',
    });
  };

  return (
    <Button danger onClick={handleClear} type={type}>
      {text}
    </Button>
  );
};

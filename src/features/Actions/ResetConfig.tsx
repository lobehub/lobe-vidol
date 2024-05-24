import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

import { useSettingStore } from '@/store/setting';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { text = '立即重置', type = 'primary' } = props;
  const resetConfig = useSettingStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();

  const handleReset = () => {
    modal.confirm({
      cancelText: '取消',
      centered: true,
      content: '操作无法撤销，重置后数据将无法恢复，请慎重操作',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      onOk: () => {
        resetConfig();
        message.success('重置成功');
      },
      title: '确认重置所有系统设置?',
    });
  };

  return (
    <Button danger onClick={handleReset} type={type}>
      {text}
    </Button>
  );
};

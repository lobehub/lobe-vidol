import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { t } = useTranslation('common');
  const { text = t('actions.clearNow'), type = 'primary' } = props;
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const clearSessionStorage = useSessionStore((s) => s.clearSessionStorage);
  const { message, modal } = App.useApp();

  const handleClear = () => {
    modal.confirm({
      cancelText: t('cancel'),
      centered: true,
      content: t('actions.clearTip'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm'),
      onOk: () => {
        clearSessionStorage();
        clearAgentStorage().then(() => {
          message.success(t('actions.clearSuccess'));
        });
      },
      title: t('actions.clearTitle'),
    });
  };

  return (
    <Button danger onClick={handleClear} type={type}>
      {text}
    </Button>
  );
};

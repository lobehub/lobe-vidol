import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { useDanceStore } from '@/store/dance';
import { useSessionStore } from '@/store/session';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { t } = useTranslation('settings');
  const { text = t('common.system.clear.action'), type = 'primary' } = props;
  const clearAgentStorage = useAgentStore((s) => s.clearAgentStorage);
  const clearSessionStorage = useSessionStore((s) => s.clearSessionStorage);
  const clearDanceStorage = useDanceStore((s) => s.clearDanceStorage);
  const { message, modal } = App.useApp();

  const handleClear = () => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      content: t('common.system.clear.tip'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm', { ns: 'common' }),
      onOk: async () => {
        await clearSessionStorage();
        await clearAgentStorage();
        await clearDanceStorage();
        message.success(t('common.system.clear.success'));
      },
      title: t('common.system.clear.alert'),
    });
  };

  return (
    <Button danger onClick={handleClear} type={type}>
      {text}
    </Button>
  );
};

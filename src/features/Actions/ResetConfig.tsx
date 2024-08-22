import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingStore } from '@/store/setting';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { t } = useTranslation('settings');
  const { text = t('common.system.reset.action'), type = 'primary' } = props;
  const resetConfig = useSettingStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();

  const handleReset = () => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      content: t('common.system.reset.tip'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm', { ns: 'common' }),
      onOk: () => {
        resetConfig();
        message.success(t('common.system.reset.success'));
      },
      title: t('common.system.reset.alert'),
    });
  };

  return (
    <Button danger onClick={handleReset} type={type}>
      {text}
    </Button>
  );
};

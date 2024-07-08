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
  const { t } = useTranslation('common');
  const { text = t('actions.resetNow'), type = 'primary' } = props;
  const resetConfig = useSettingStore((s) => s.resetConfig);
  const { message, modal } = App.useApp();

  const handleReset = () => {
    modal.confirm({
      cancelText: t('cancel'),
      centered: true,
      content: t('actions.resetTip'),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm'),
      onOk: () => {
        resetConfig();
        message.success(t('actions.resetSuccess'));
      },
      title: t('actions.resetTitle'),
    });
  };

  return (
    <Button danger onClick={handleReset} type={type}>
      {text}
    </Button>
  );
};

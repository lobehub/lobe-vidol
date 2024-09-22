import { App, Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useCacheSize from '@/hooks/useCacheSize';
import { cacheStorage } from '@/utils/storage';

interface Props {
  text?: string;
  type?: ButtonType;
}
export default (props: Props) => {
  const { t } = useTranslation(['settings', 'common']);
  const { text = t('common.system.clearCache.action'), type = 'primary' } = props;
  const { message, modal } = App.useApp();
  const { loading, size, fetchCacheSize } = useCacheSize();

  useEffect(() => {
    fetchCacheSize();
  }, []);

  const handleClearCache = () => {
    modal.confirm({
      cancelText: t('cancel', { ns: 'common' }),
      centered: true,
      content: t('common.system.clearCache.tip', { ns: 'settings' }),
      okButtonProps: {
        danger: true,
      },
      okText: t('confirm', { ns: 'common' }),
      onOk: async () => {
        await cacheStorage.clear();
        await fetchCacheSize();
        message.success(t('common.system.clearCache.success', { ns: 'settings' }));
      },
      title: t('common.system.clearCache.alert', { ns: 'settings' }),
    });
  };

  return (
    <Button danger onClick={handleClearCache} type={type} loading={loading}>
      {text}
      {loading
        ? `(${t('common.system.clearCache.calculating', { ns: 'settings' })})`
        : `(${size} MB)`}
    </Button>
  );
};

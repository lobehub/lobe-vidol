import { Button, Popconfirm, message } from 'antd';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';
import { Dance } from '@/types/dance';

interface UnSubscribeButtonProps {
  dance: Dance;
}

const UnSubscribe = memo((props: UnSubscribeButtonProps) => {
  const { dance } = props;
  const removeDanceItem = useDanceStore((s) => s.removeDanceItem);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(['common', 'panel']);

  return (
    <Popconfirm
      cancelText={t('cancel', { ns: 'common' })}
      description={t('dance.cancelAddPlay', { musicName: dance?.name, ns: 'panel' })}
      key="delete"
      okText={t('confirm', { ns: 'common' })}
      okButtonProps={{ loading: loading, danger: true }}
      onConfirm={async () => {
        if (dance) {
          setLoading(true);
          await removeDanceItem(dance.danceId);
          message.success(t('actions.unsubscribeSuccess'));
          setLoading(false);
        }
      }}
      title={t('dance.cancelSubscribed', { ns: 'panel' }) + '?'}
    >
      <Button danger>{t('dance.cancelSubscribed', { ns: 'panel' })}</Button>
    </Popconfirm>
  );
});

export default UnSubscribe;

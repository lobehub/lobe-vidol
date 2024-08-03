import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useDanceStore } from '@/store/dance';

export default () => {
  const { t } = useTranslation('common');
  const clearPlayList = useDanceStore((s) => s.clearPlayList);

  return (
    <Popconfirm
      cancelText={t('cancel', { ns: 'common' })}
      description={t('actions.clearPlayListTip')}
      key="delete"
      placement="left"
      okText={t('confirm', { ns: 'common' })}
      onConfirm={() => {
        clearPlayList();
      }}
      title={t('actions.clearPlayList') + '?'}
    >
      <ActionIcon icon={Trash2} title={t('actions.clearPlayList')} />
    </Popconfirm>
  );
};

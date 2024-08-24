import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

const History = () => {
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  const { t } = useTranslation('chat');
  return (
    <Popconfirm
      cancelText={t('cancel', { ns: 'common' })}
      description={t('history.tip')}
      okText={t('confirm', { ns: 'common' })}
      onConfirm={clearHistory}
      title={t('history.alert')}
    >
      <ActionIcon icon={Eraser} title={t('history.action')} />
    </Popconfirm>
  );
};

export default History;

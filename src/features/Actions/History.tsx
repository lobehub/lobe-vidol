import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

const History = () => {
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  const { t } = useTranslation('common');
  return (
    <Popconfirm
      cancelText={t('cancel')}
      description={t('actions.clearHistoryTip')}
      okText={t('confirm')}
      onConfirm={clearHistory}
      title={t('actions.clearHistoryTitle')}
    >
      <ActionIcon icon={Eraser} title={t('actions.clearContext')} />
    </Popconfirm>
  );
};

export default History;

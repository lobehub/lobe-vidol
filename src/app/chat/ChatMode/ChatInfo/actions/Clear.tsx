import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { Eraser } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

const Clear = () => {
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  const { t } = useTranslation('chat');
  return (
    <Popconfirm
      cancelText={t('cancel', { ns: 'common' })}
      description={t('clear.tip')}
      okText={t('confirm', { ns: 'common' })}
      onConfirm={clearHistory}
      title={t('clear.alert')}
    >
      <ActionIcon icon={Eraser} title={t('clear.action')} />
    </Popconfirm>
  );
};

export default Clear;

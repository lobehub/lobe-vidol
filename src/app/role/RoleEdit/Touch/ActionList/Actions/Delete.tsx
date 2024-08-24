import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { XIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAgentStore } from '@/store/agent';
import { TouchAreaEnum } from '@/types/touch';

interface Props {
  index: number;
  touchArea: TouchAreaEnum;
}

export default memo((props: Props) => {
  const { touchArea, index } = props;
  const { t } = useTranslation('common');
  const [removeTouchAction] = useAgentStore((s) => [s.removeTouchAction]);
  return (
    <Popconfirm
      title={t('confirmDel')}
      key="delete"
      okText={t('confirm')}
      cancelText={t('cancel')}
      onConfirm={() => {
        removeTouchAction(touchArea, index);
      }}
    >
      <ActionIcon icon={XIcon} title={t('delete')} />
    </Popconfirm>
  );
});

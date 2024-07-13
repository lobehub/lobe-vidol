import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { XIcon } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { TouchAreaEnum } from '@/types/touch';

interface Props {
  gender: GenderEnum;
  index: number;
  touchArea: TouchAreaEnum;
}

const DeleteButton = memo<Props>(({ touchArea, index, gender }) => {
  const { t } = useTranslation('common');
  const [removeTouchAction] = useSettingStore((s) => [s.removeTouchAction]);
  return (
    <Popconfirm
      title={t('actions.confirmDel')}
      key="delete"
      okText={t('confirm')}
      cancelText={t('cancel')}
      onConfirm={() => {
        removeTouchAction(gender, touchArea, index);
      }}
    >
      <ActionIcon icon={XIcon} title={t('actions.del')} />
    </Popconfirm>
  );
});

export default DeleteButton;

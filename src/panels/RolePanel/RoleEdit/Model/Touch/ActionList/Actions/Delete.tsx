import { ActionIcon } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { XIcon } from 'lucide-react';
import { memo } from 'react';

import { useAgentStore } from '@/store/agent';
import { TouchAreaEnum } from '@/types/touch';

interface Props {
  index: number;
  touchArea: TouchAreaEnum;
}

export default memo((props: Props) => {
  const { touchArea, index } = props;
  const [removeTouchAction] = useAgentStore((s) => [s.removeTouchAction]);
  return (
    <Popconfirm
      title={'确定删除吗？'}
      key="delete"
      okText={'确定'}
      cancelText={'取消'}
      onConfirm={() => {
        removeTouchAction(touchArea, index);
      }}
    >
      <ActionIcon icon={XIcon} title={'删除'} />
    </Popconfirm>
  );
});

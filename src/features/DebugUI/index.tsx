'use client';

import { Icon } from '@lobehub/ui';
import { FloatButton } from 'antd';
import { LucideBugPlay } from 'lucide-react';
import { memo } from 'react';

const DebugUI = memo(() => {
  return (
    <FloatButton
      icon={<Icon icon={LucideBugPlay} />}
      onClick={async () => {
        throw new Error('触发错误');
      }}
      tooltip={'触发错误'}
    />
  );
});

export default DebugUI;

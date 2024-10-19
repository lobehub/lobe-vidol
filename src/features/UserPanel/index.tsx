'use client';

import { Popover } from 'antd';
import { PropsWithChildren, memo, useState } from 'react';

import PanelContent from './PanelContent';

const UserPanel = memo<PropsWithChildren>(({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      arrow={false}
      content={<PanelContent closePopover={() => setOpen(false)} />}
      onOpenChange={setOpen}
      open={open}
      overlayInnerStyle={{ padding: 0 }}
      placement={'topRight'}
      trigger={['click']}
    >
      {children}
    </Popover>
  );
});

UserPanel.displayName = 'UserPanel';

export default UserPanel;

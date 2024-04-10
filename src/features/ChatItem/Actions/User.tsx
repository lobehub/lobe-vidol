import type { RenderAction } from '@/features/ChatItem/type';
import { ActionIconGroup, useChatListActionsBar } from '@lobehub/ui';
import { memo } from 'react';

const UserActionsBar: RenderAction = ({ onActionClick }) => {
  const { copy, divider, del, edit } = useChatListActionsBar({
    copy: '复制',
    delete: '删除',
    edit: '编辑',
    regenerate: '重新生成',
  });
  return (
    <ActionIconGroup
      dropdownMenu={[copy, divider, del]}
      items={[edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
};

export default memo(UserActionsBar);

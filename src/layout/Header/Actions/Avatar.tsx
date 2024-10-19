import { memo } from 'react';

import UserPanel from '@/features/UserPanel';
import UserAvatar from '@/features/UserPanel/UserAvatar';

const Avatar = memo(() => {
  return (
    <UserPanel>
      <UserAvatar clickable />
    </UserPanel>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;

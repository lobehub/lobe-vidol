import { ActionIcon } from '@lobehub/ui';
import { Video } from 'lucide-react';

import { useChatStore } from '@/app/chat/store/chat';

const Camera = () => {
  const [setMode] = useChatStore((s) => [s.setMode]);

  return <ActionIcon icon={Video} onClick={() => setMode('camera')} title="视频通话" />;
};

export default Camera;

import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Phone } from 'lucide-react';

import { useChatStore } from '@/app/chat/store/chat';
import { DESKTOP_OPERATION_ICON_SIZE } from '@/constants/token';

const CallOff = () => {
  const [setMode] = useChatStore((s) => [s.setMode]);
  const theme = useTheme();

  return (
    <ActionIcon
      icon={Phone}
      onClick={() => setMode('chat')}
      title="挂断"
      size={DESKTOP_OPERATION_ICON_SIZE}
      style={{
        backgroundColor: theme.colorWhite,
        color: theme.colorError,
      }}
    />
  );
};

export default CallOff;

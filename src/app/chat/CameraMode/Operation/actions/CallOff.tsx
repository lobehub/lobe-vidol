import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useChatStore } from '@/app/chat/store/chat';
import { DESKTOP_OPERATION_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

const CallOff = () => {
  const [setMode] = useChatStore((s) => [s.setMode]);
  const setVoiceOn = useSessionStore((s) => s.setVoiceOn);
  const theme = useTheme();
  const { t } = useTranslation('chat');
  return (
    <ActionIcon
      icon={Phone}
      onClick={() => {
        setVoiceOn(false);
        setMode('chat');
      }}
      title={t('callOff')}
      size={DESKTOP_OPERATION_ICON_SIZE}
      style={{
        backgroundColor: theme.colorError,
        color: theme.colorWhite,
      }}
    />
  );
};

export default CallOff;

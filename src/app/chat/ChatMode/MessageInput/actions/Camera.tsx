import { ActionIcon } from '@lobehub/ui';
import { message } from 'antd';
import { Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/store/session';

const Camera = () => {
  const [setChatMode] = useSessionStore((s) => [s.setChatMode]);
  const setVoiceOn = useSessionStore((s) => s.setVoiceOn);
  const { t } = useTranslation('chat');

  return (
    <ActionIcon
      icon={Video}
      onClick={() => {
        message.info(t('voiceOn'));
        setVoiceOn(true);
        setChatMode('camera');
      }}
      title={t('camera')}
    />
  );
};

export default Camera;

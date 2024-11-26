import { ActionIcon } from '@lobehub/ui';
import { message } from 'antd';
import { Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';

const Camera = () => {
  const [setChatMode, setVoiceOn] = useGlobalStore((s) => [s.setChatMode, s.setVoiceOn]);
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

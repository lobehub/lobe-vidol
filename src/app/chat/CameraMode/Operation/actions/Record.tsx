import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Mic } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_OPERATION_ICON_SIZE_LARGE } from '@/constants/token';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSessionStore } from '@/store/session';

const Record = () => {
  const [sendMessage, setMessageInput] = useSessionStore((s) => [s.sendMessage, s.setMessageInput]);
  const { t } = useTranslation('chat');
  const theme = useTheme();
  const handleMessageInput = useCallback(
    (result: string, isFinal: boolean) => {
      setMessageInput(result);
      if (isFinal) {
        sendMessage(result);
        setMessageInput('');
      }
    },
    [sendMessage, setMessageInput],
  );

  const { isRecording, toggleRecord } = useSpeechRecognition({
    onMessage: handleMessageInput,
  });

  return (
    <ActionIcon
      icon={Mic}
      loading={isRecording}
      onClick={toggleRecord}
      title={t('tts.record')}
      size={DESKTOP_OPERATION_ICON_SIZE_LARGE}
      style={{
        backgroundColor: theme.colorBgElevated,
      }}
    />
  );
};

export default Record;

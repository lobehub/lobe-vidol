import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Mic } from 'lucide-react';
import { useCallback } from 'react';

const Record = () => {
  const [sendMessage, setMessageInput] = useSessionStore((s) => [s.sendMessage, s.setMessageInput]);

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
      title="语音识别（需科学上网）"
    />
  );
};

export default Record;

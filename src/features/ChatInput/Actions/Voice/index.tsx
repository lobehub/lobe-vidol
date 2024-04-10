import { toogleVoice } from '@/services/chat';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import classNames from 'classnames';
import { Volume2 } from 'lucide-react';
import { useStyles } from './style';

const VoiceSwitch = () => {
  const { styles } = useStyles();
  const [voiceOn] = useSessionStore((s) => [s.voiceOn]);

  return (
    <ActionIcon
      className={classNames(styles.voice, voiceOn && styles.voiceOn)}
      icon={Volume2}
      onClick={toogleVoice}
      title={voiceOn ? '关闭语音合成' : '开启语音合成'}
    />
  );
};

export default VoiceSwitch;

import AudioPlayer from '@/app/home/Docker/AudioPlayer';
import ToolBar from '@/app/home/Docker/ToolBar';
import MessageInput from '@/features/ChatInput/MessageInput';
import { Space } from 'antd';
import Apps from './Apps';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.docker}>
      <div className={styles.apps}>
        <Apps />
      </div>
      <div className={styles.message}>
        <Space size={4}>
          <MessageInput />
          <ToolBar />
        </Space>
      </div>
      <div className={styles.player}>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Docker;

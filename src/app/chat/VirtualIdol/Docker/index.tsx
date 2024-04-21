'use client';

import ChatInputDialog from './ChatInputDialog';
import { useStyles } from './style';
import AudioPlayer from "@/features/AudioPlayer";

const VirtualIdol = () => {
  const { styles } = useStyles();

  return (
      <div className={styles.docker}>
        <div className={styles.message}>
            <ChatInputDialog />
        </div>
        <div className={styles.player}>
          <AudioPlayer />
        </div>
    </div>
  );
};

export default VirtualIdol;

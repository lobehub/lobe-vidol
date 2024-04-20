'use client';

import { Space } from 'antd';

import MessageInput from '@/features/ChatInput/MessageInput';

import ToolBar from './ToolBar';
import { useStyles } from './style';

const VirtualIdol = () => {
  const { styles } = useStyles();

  return (
      <div className={styles.docker}>
        <div className={styles.message}>
          <Space size={4}>
            <MessageInput />
            <ToolBar />
          </Space>
        </div>
        {/*<div className={styles.player}>*/}
        {/*  <AudioPlayer />*/}
        {/*</div>*/}
    </div>
  );
};

export default VirtualIdol;

'use client';

import PanelContainer from '@/panels/PanelContainer';
import classNames from 'classnames';
import React from 'react';
import ChatBot from './ChatBot';
import SideBar from './SideBar';
import { useStyles } from './style';

interface ChatPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChatPanel = (props: ChatPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer className={className} panelKey="chat" style={style} title="聊天">
      <div className={classNames(className, styles.content)} style={style}>
        <SideBar />
        <ChatBot />
      </div>
    </PanelContainer>
  );
};

export default ChatPanel;

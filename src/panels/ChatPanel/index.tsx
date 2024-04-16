'use client';

import React from 'react';

import PanelContainer from '@/panels/PanelContainer';

import ChatBot from './ChatBot';

interface ChatPanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChatPanel = (props: ChatPanelProps) => {
  const { style, className } = props;

  return (
    <PanelContainer className={className} panelKey="chat" style={style} title="聊天">
      <ChatBot />
    </PanelContainer>
  );
};

export default ChatPanel;

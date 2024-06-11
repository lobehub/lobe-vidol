import { SendOutlined } from '@ant-design/icons';
import { Icon, TextArea } from '@lobehub/ui';
import { Button, Space } from 'antd';
import { useTheme } from 'antd-style';
import { InputRef } from 'antd/es/input/Input';
import { ChevronUp, CornerDownLeft, LucideCommand } from 'lucide-react';
import React, { memo, useRef } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import Dance from '@/features/Actions/Dance';
import History from '@/features/Actions/History';
import Record from '@/features/Actions/Record';
import ToggleChatDialog from '@/features/Actions/ToggleChatDialog';
import TokenMini from '@/features/Actions/TokenMini';
import Video from '@/features/Actions/Video';
import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isCommandPressed } from '@/utils/keyboard';
import { isMacOS } from '@/utils/platform';

import { useStyles } from './style';

interface InputAreaProps {
  className?: string;
  style?: React.CSSProperties;
}

const isMac = isMacOS();

const InputArea = memo((props: InputAreaProps) => {
  const ref = useRef<InputRef>(null);
  const isChineseInput = useRef(false);
  const onSend = useChatInput();
  const { styles } = useStyles();
  const theme = useTheme();

  const { className, style } = props;

  const [loading, messageInput, setMessageInput, stopGenerateMessage] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.messageInput,
    s.setMessageInput,
    s.stopGenerateMessage,
  ]);

  const cmdEnter = (
    <Flexbox gap={2} horizontal>
      <Icon icon={isMac ? LucideCommand : ChevronUp} />
      <Icon icon={CornerDownLeft} />
    </Flexbox>
  );

  const enter = (
    <Center>
      <Icon icon={CornerDownLeft} />
    </Center>
  );

  const ShortCuts = (
    <Flexbox gap={4} horizontal style={{ color: theme.colorTextDescription, fontSize: 12 }}>
      {enter}
      <span>发送</span>
      <span>/</span>
      {cmdEnter}
      <span>换行</span>
    </Flexbox>
  );

  return (
    <Flexbox className={className} style={style}>
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginBottom: 4 }}>
        <Space size={4}>
          <Record />
          <Video key="video" />
          <Dance key={'dance'} />
          <TokenMini />
        </Space>
        <Space size={4}>
          <ToggleChatDialog key={'dialog'} />
          <History key={'history'} />
        </Space>
      </Flexbox>
      <Flexbox width={'100%'} horizontal gap={4}>
        <TextArea
          autoFocus
          onBlur={(e) => {
            setMessageInput?.(e.target.value);
          }}
          onChange={(e) => {
            setMessageInput?.(e.target.value);
          }}
          onCompositionEnd={() => {
            isChineseInput.current = false;
          }}
          onCompositionStart={() => {
            isChineseInput.current = true;
          }}
          onPressEnter={(e) => {
            if (loading || e.shiftKey || isChineseInput.current) return;

            if (isCommandPressed(e)) {
              setMessageInput?.((e.target as any).value + '\n');
              return;
            }

            e.preventDefault();
            onSend();
          }}
          placeholder="请输入内容开始聊天"
          ref={ref}
          autoSize={true}
          type={'block'}
          value={messageInput}
        />
        <Button
          onClick={() => {
            if (loading) {
              stopGenerateMessage();
            } else {
              onSend();
            }
          }}
          icon={loading ? <StopLoadingIcon /> : <SendOutlined />}
          // type={loading ? undefined : 'primary'}
        />
      </Flexbox>
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginTop: 4 }}>
        <div className={styles.alert}>请谨记：智能体所说的一切都是由 AI 生成的</div>
        {ShortCuts}
      </Flexbox>
    </Flexbox>
  );
});

export default InputArea;

import { SendOutlined } from '@ant-design/icons';
import { TextArea } from '@lobehub/ui';
import { Button } from 'antd';
import { InputRef } from 'antd/es/input/Input';
import React, { memo, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import Record from '@/features/Actions/Record';
import TokenMini from '@/features/Actions/TokenMini';
import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isCommandPressed } from '@/utils/keyboard';

import { useStyles } from './style';

interface InputAreaProps {
  className?: string;
  style?: React.CSSProperties;
}

const InputArea = memo((props: InputAreaProps) => {
  const ref = useRef<InputRef>(null);
  const isChineseInput = useRef(false);
  const onSend = useChatInput();
  const { styles } = useStyles();

  const { className, style } = props;

  const [loading, messageInput, setMessageInput, stopGenerateMessage] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.messageInput,
    s.setMessageInput,
    s.stopGenerateMessage,
  ]);

  return (
    <Flexbox className={className} style={style}>
      <Flexbox width={'100%'} horizontal gap={4}>
        <Record />
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
          type={loading ? undefined : 'primary'}
        />
      </Flexbox>
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginTop: 8 }}>
        <div className={styles.alert}>请谨记：智能体所说的一切都是由 AI 生成的</div>
        <TokenMini />
      </Flexbox>
    </Flexbox>
  );
});

export default InputArea;

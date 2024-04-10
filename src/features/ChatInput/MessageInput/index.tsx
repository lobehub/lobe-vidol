import { DEFAULT_USER_AVATAR } from '@/constants/common';
import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isCommandPressed } from '@/utils/keyboard';
import { Avatar, Input } from '@lobehub/ui';
import { Button, Space } from 'antd';
import { createStyles } from 'antd-style';
import { InputRef } from 'antd/es/input/Input';
import { memo, useRef } from 'react';

const useStyles = createStyles(({ css }) => {
  return {
    textarea: css`
      width: 400px;
    `,
  };
});

const InputArea = memo(() => {
  const { styles } = useStyles();
  const ref = useRef<InputRef>(null);
  const isChineseInput = useRef(false);
  const onSend = useChatInput();

  const [loading, messageInput, setMessageInput] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.messageInput,
    s.setMessageInput,
  ]);

  return (
    <Space size={4}>
      <Avatar avatar={DEFAULT_USER_AVATAR} />
      <Input
        autoFocus
        className={styles.textarea}
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
        type={'block'}
        value={messageInput}
      />
      <Button
        onClick={() => {
          if (loading) return;
          onSend();
        }}
        type="primary"
      >
        发送
      </Button>
    </Space>
  );
});

export default InputArea;

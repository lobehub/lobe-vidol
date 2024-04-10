import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isCommandPressed } from '@/utils/keyboard';
import { TextArea } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { TextAreaRef } from 'antd/es/input/TextArea';
import React, { memo, useRef } from 'react';

const useStyles = createStyles(({ css }) => {
  return {
    textarea: css`
      resize: none !important;

      height: 100% !important;
      padding: 0 24px;

      line-height: 1.5;

      box-shadow: none !important;
    `,
    textareaContainer: css`
      position: relative;
      flex: 1;
    `,
  };
});

interface InputAreaProps {
  setExpand?: (expand: boolean) => void;
}

const InputArea = memo<InputAreaProps>(({ setExpand }) => {
  const { styles } = useStyles();
  const ref = useRef<TextAreaRef>(null);
  const isChineseInput = useRef(false);
  const onSend = useChatInput();

  const [loading, messageInput, setMessageInput] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.messageInput,
    s.setMessageInput,
  ]);

  const send = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onSend();
    setExpand?.(false);
  };

  return (
    <div className={styles.textareaContainer}>
      <TextArea
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

          send(e);
        }}
        placeholder="请输入内容开始聊天"
        ref={ref}
        type={'pure'}
        value={messageInput}
      />
    </div>
  );
});

export default InputArea;

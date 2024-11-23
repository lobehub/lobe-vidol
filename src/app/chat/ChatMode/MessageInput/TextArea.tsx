import { TextArea } from '@lobehub/ui';
import { InputRef } from 'antd/es/input/Input';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isCommandPressed } from '@/utils/keyboard';

const InputArea = memo(() => {
  const ref = useRef<InputRef>(null);
  const isChineseInput = useRef(false);
  const onSend = useChatInput();
  const { t } = useTranslation('chat');
  const [loading, messageInput, setMessageInput] = useSessionStore((s) => [
    !!s.chatLoadingId,
    s.messageInput,
    s.setMessageInput,
    s.stopGenerateMessage,
  ]);

  return (
    <TextArea
      autoFocus
      onBlur={(e) => {
        setMessageInput?.(e.target.value);
      }}
      // className={styles.input}
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
      placeholder={t('input.placeholder')}
      ref={ref}
      rows={1}
      autoSize={{ minRows: 1, maxRows: 10 }}
      type={'block'}
      value={messageInput}
    />
  );
});

export default InputArea;

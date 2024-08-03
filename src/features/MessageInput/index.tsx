import { SendOutlined } from '@ant-design/icons';
import { Icon, TextArea } from '@lobehub/ui';
import { Button, Space } from 'antd';
import { useTheme } from 'antd-style';
import { InputRef } from 'antd/es/input/Input';
import { ChevronUp, CornerDownLeft, LucideCommand } from 'lucide-react';
import React, { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import History from '@/features/Actions/History';
import Record from '@/features/Actions/Record';
import TokenMini from '@/features/Actions/TokenMini';
import Voice from '@/features/Actions/Voice';
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
  const { t } = useTranslation('common');

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
      <span>{t('actions.send')}</span>
      <span>/</span>
      {cmdEnter}
      <span>{t('actions.warp')}</span>
    </Flexbox>
  );

  return (
    <Flexbox className={className} style={style}>
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginBottom: 4 }}>
        <Space size={4}>
          <Record />
          <TokenMini />
        </Space>
        <Space size={4}>
          <Voice key={'voice'} />
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
          placeholder={t('inputStartChat')}
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
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginTop: 4 }}>
        <div className={styles.alert}>{t('aiAlert')}</div>
        {ShortCuts}
      </Flexbox>
    </Flexbox>
  );
});

export default InputArea;

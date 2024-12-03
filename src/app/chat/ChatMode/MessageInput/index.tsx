import { SendOutlined } from '@ant-design/icons';
import { Icon } from '@lobehub/ui';
import { Button, Typography } from 'antd';
import { useTheme } from 'antd-style';
import { ChevronUp, CornerDownLeft, LucideCommand } from 'lucide-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import StopLoadingIcon from '@/components/StopLoading';
import useChatInput from '@/hooks/useSendMessage';
import { useSessionStore } from '@/store/session';
import { isMacOS } from '@/utils/platform';

import TextArea from './TextArea';
import Camera from './actions/Camera';
import { useStyles } from './style';

interface InputAreaProps {
  className?: string;
  style?: React.CSSProperties;
}

const isMac = isMacOS();

const InputArea = memo((props: InputAreaProps) => {
  const onSend = useChatInput();
  const { styles } = useStyles();
  const theme = useTheme();
  const { t } = useTranslation('chat');

  const { className, style } = props;

  const [loading, stopGenerateMessage] = useSessionStore((s) => [
    !!s.chatLoadingId,
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
      <span>{t('input.send')}</span>
      <span>/</span>
      {cmdEnter}
      <span>{t('input.warp')}</span>
    </Flexbox>
  );

  return (
    <Flexbox className={className} style={style}>
      <Flexbox width={'100%'} horizontal gap={4} align={'center'}>
        <TextArea />
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
        <Camera />
      </Flexbox>
      <Flexbox horizontal justify={'space-between'} align={'center'} style={{ marginTop: 4 }}>
        <Typography.Text className={styles.alert} ellipsis>
          {t('input.alert')}
        </Typography.Text>
        {ShortCuts}
      </Flexbox>
    </Flexbox>
  );
});

export default InputArea;

'use client';

import { CheckCircleFilled } from '@ant-design/icons';
import { Alert, Highlighter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import { useTheme } from 'antd-style';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useProviderName } from '@/hooks/useProviderName';
import { chatCompletion } from '@/services/chat';
import { ChatMessage } from '@/types/chat';
import { ChatMessageError } from '@/types/message';
import { getMessageError } from '@/utils/parseError';

interface ConnectionCheckerProps {
  model: string;
  provider: string;
}

const Error = memo<{ error: ChatMessageError }>(({ error }) => {
  const { t } = useTranslation('error');
  const providerName = useProviderName(error.body?.provider);

  return (
    <Flexbox gap={8} style={{ maxWidth: '600px', width: '100%' }}>
      <Alert
        banner
        extra={
          <Flexbox>
            <Highlighter copyButtonSize={'small'} language={'json'} type={'pure'}>
              {JSON.stringify(error.body || error, null, 2)}
            </Highlighter>
          </Flexbox>
        }
        message={t(`response.${error.type}` as any, { provider: providerName })}
        showIcon
        type={'error'}
      />
    </Flexbox>
  );
});

const Checker = memo<ConnectionCheckerProps>(({ model, provider }) => {
  const { t } = useTranslation('settings');

  const [pass, setPass] = useState(false);

  const theme = useTheme();
  const [error, setError] = useState<ChatMessageError | undefined>();

  const { loading, run: checkConnect } = useRequest(chatCompletion, {
    manual: true,
    onSuccess: (res) => {
      if (!res.ok) {
        getMessageError(res).then((err) => {
          setError(err);
        });
        return;
      }
      setPass(true);
      message.success(t('llm.checker.pass'));
    },
    onError: () => {
      message.error(t('llm.checker.error'));
    },
  });

  const checkConnection = async () => {
    checkConnect({
      messages: [
        {
          content: 'Hi',
          role: 'user',
        } as ChatMessage,
      ],
      model,
      provider,
    });
  };
  const isMobile = useIsMobile();

  return (
    <Flexbox align={isMobile ? 'flex-start' : 'flex-end'} gap={8}>
      <Flexbox align={'center'} direction={isMobile ? 'horizontal-reverse' : 'horizontal'} gap={12}>
        {pass && (
          <Flexbox gap={4} horizontal>
            <CheckCircleFilled
              style={{
                color: theme.colorSuccess,
              }}
            />
            {t('llm.checker.pass')}
          </Flexbox>
        )}
        <Button loading={loading} onClick={checkConnection}>
          {t('llm.checker.button')}
        </Button>
      </Flexbox>
      {error && <Error error={error} />}
    </Flexbox>
  );
});

export default Checker;

import { configSelectors, useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { Icon } from '@lobehub/ui';
import { Button, Input } from 'antd';
import { Network } from 'lucide-react';
import { memo, useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { FormAction } from './style';

interface APIKeyFormProps {
  id: string;
}

const APIKeyForm = ({ id }: APIKeyFormProps) => {
  const [showProxy, setShow] = useState(false);

  const [currentOpenAIConfig, setConfig] = useConfigStore((s) => [
    configSelectors.currentOpenAIConfig(s),
    s.setOpenAIConfig,
  ]);

  const [resend, deleteMessage] = useSessionStore((s) => [s.regenerateMessage, s.deleteMessage]);

  return (
    <Center gap={16} style={{ maxWidth: 300 }}>
      <FormAction
        avatar={'🔑'}
        description={'输入你的 OpenAI API Key 即可开始会话。应用不会记录你的 API Key'}
        title={'自定义 API Key'}
      >
        <Input.Password
          autoComplete="new-password"
          onChange={(e) => {
            setConfig({ apikey: e.target.value });
          }}
          placeholder={'sk-************************************'}
          type={'block'}
          value={currentOpenAIConfig?.apikey}
        />
        {showProxy ? (
          <Input
            onChange={(e) => {
              setConfig({ endpoint: e.target.value });
            }}
            placeholder={'https://api.openai.com/v1'}
            type={'block'}
            value={currentOpenAIConfig?.endpoint}
          />
        ) : (
          <Button
            icon={<Icon icon={Network} />}
            onClick={() => {
              setShow(true);
            }}
            type={'text'}
          >
            添加 OpenAI 代理地址（可选）
          </Button>
        )}
      </FormAction>
      <Flexbox gap={12} width={'100%'}>
        <Button
          block
          onClick={() => {
            resend(id);
            deleteMessage(id);
          }}
          style={{ marginTop: 8 }}
          type={'primary'}
        >
          确认并重试
        </Button>
        <Button
          onClick={() => {
            deleteMessage(id);
          }}
        >
          关闭提示
        </Button>
      </Flexbox>
    </Center>
  );
};

export default memo(APIKeyForm);

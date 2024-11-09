import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Form as AForm, Button, Input, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce, isEqual } from 'lodash-es';
import { BotIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { chatCompletion } from '@/services/chat';
import { configSelectors, useSettingStore } from '@/store/setting';
import { ChatMessage } from '@/types/chat';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    display: flex;
    flex-grow: 1;
    justify-content: center;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = AForm.useForm();
  const { t } = useTranslation('settings');
  const openAIConfig = useSettingStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const setOpenAIConfig = useSettingStore((s) => s.setOpenAIConfig);

  useEffect(() => {
    form.setFieldsValue(openAIConfig);
  }, [openAIConfig, form]);

  const { loading, run: checkConnect } = useRequest(chatCompletion, {
    manual: true,
    onSuccess: (res) => {
      if (!res.ok) {
        message.error(t('llm.check.error'));
        return;
      }
      message.success(t('llm.check.success'));
    },
  });

  return (
    <div className={classNames(styles.config, className)} style={style}>
      <Form
        form={form}
        onValuesChange={debounce(setOpenAIConfig, 100)}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        <FormGroup icon={BotIcon} title={t('llm.openai.title')}>
          <FormItem desc={t('llm.openai.apiKey.desc')} divider label={'API Key'} name="apikey">
            <Input.Password placeholder="sk-" type={'block'} style={{ minWidth: 400 }} />
          </FormItem>
          <FormItem desc={'http(s)://'} divider label={t('llm.openai.proxy.title')} name="endpoint">
            <Input type={'block'} style={{ minWidth: 400 }} placeholder="http(s)://" />
          </FormItem>
          <FormItem desc={t('llm.check.desc')} divider label={t('llm.check.title')}>
            <Button
              loading={loading}
              onClick={() =>
                checkConnect({
                  messages: [
                    {
                      content: 'Hi',
                      role: 'user',
                    } as ChatMessage,
                  ],
                  model: 'gpt-4o-mini',
                })
              }
            >
              {t('llm.check.action')}
            </Button>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Config;

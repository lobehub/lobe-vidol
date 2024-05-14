import { FormFooter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Divider, Form, Input, Select, Slider, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import { useSyncSettings } from '@/panels/RolePanel/RoleEdit/useSyncSetting';
import { speechApi, voiceListApi } from '@/services/tts';
import { useAgentStore } from '@/store/agent';
import { Voice } from '@/types/tts';

const FormItem = Form.Item;

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const suportedLocales = [
  {
    label: '中文(普通话)',
    samples: ['哈喽，早上好', '正在为你准备我的整个世界', '你好，旅行者!'],
    value: 'zh-CN',
  },
  {
    label: '日语(日本)',
    samples: [
      'こんにちは、おはようございます！',
      'あなたのために私の全世界を準備しています',
      'こんにちは、旅行者さん！',
    ],
    value: 'ja-JP',
  },
  {
    label: '英语(美国)',
    samples: ['Hello, traveler!', "I'm preparing my whole world for you.", 'Hello, traveler!'],
    value: 'en-US',
  },
  {
    label: '韩语(韩国)',
    samples: [
      '안녕하세요, 여행자!',
      '당신을 위해 내 전 세계를 준비하고 있습니다.',
      '안녕, 여행자!',
    ],
    value: 'ko-KR',
  },
  {
    label: '中文(粤语)',
    samples: ['哈喽，早晨好', '正在为您准备我的整个世界', '你好，旅行者！'],
    value: 'zh-HK',
  },
];

const useStyles = createStyles(({ css, token }) => ({
  audio: css`
    margin-top: 20px;
  `,
  config: css`
    flex: 3;
    padding: 12px;
    border-radius: ${token.borderRadius}px;
  `,
  container: css`
    display: flex;
    flex-direction: column;
  `,
  form: css`
    display: flex;
  `,
  message: css`
    flex: 5;
    margin-right: 12px;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLAudioElement>(null);
  const [form] = Form.useForm();
  const [voices, setVoices] = useState<Voice[]>([]);
  const updateAgentConfig = useAgentStore((s) => s.updateAgentConfig);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  useSyncSettings(form);

  const { loading, run: speek } = useRequest(speechApi, {
    manual: true,
    onError: (err) => {
      message.error(err.message);
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
        ref.current.src = '';
      }
    },
    onSuccess: (res) => {
      message.success('转换成功');
      const adUrl = URL.createObjectURL(new Blob([res]));
      setAudioUrl(adUrl);
      if (ref.current) {
        ref.current.src = adUrl;
        ref.current.play();
      }
    },
  });

  const { loading: voiceLoading, run: getVoiceList } = useRequest(
    () => {
      const engine = form.getFieldValue(['tts', 'engine']);
      return voiceListApi(engine);
    },
    {
      onSuccess: (res) => {
        setVoices(res.data);
      },
    },
  );

  const getExtraNode = () => {
    const samples =
      suportedLocales.find((item) => item.value === form.getFieldValue(['tts', 'locale']))
        ?.samples || [];
    const nodes: React.ReactNode[] = [];

    samples.forEach((item, index) => {
      nodes.push(
        <a href="#" onClick={() => form.setFieldValue(['tts', 'message'], item)}>
          {item}
        </a>,
      );
      if (index !== samples.length - 1) {
        nodes.push(<Divider type="vertical" />);
      }
    });
    return nodes;
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={() => {
        form.validateFields().then((values) => {
          updateAgentConfig(values);
          message.success('保存成功');
        });
      }}
      onValuesChange={(changedValues) => {
        if (changedValues.tts.engine) {
          form.setFieldsValue({ tts: { voice: undefined } });
          getVoiceList();
        }
        if (changedValues.tts.locale) {
          const sample = suportedLocales.find((item) => item.value === changedValues.locale)
            ?.samples[1];

          form.setFieldsValue({ tts: { voice: undefined, message: sample } });
        }
      }}
      preserve={false}
      requiredMark={false}
    >
      <div className={classNames(className, styles.container)} style={style}>
        <div className={styles.form}>
          <div className={styles.message}>
            <FormItem dependencies={[['tts', 'locale']]} noStyle>
              {() => (
                <FormItem
                  extra={getExtraNode()}
                  name={['tts', 'message']}
                  style={{ marginBottom: 0 }}
                >
                  <Input.TextArea
                    autoSize={{ maxRows: 28, minRows: 28 }}
                    maxLength={800}
                    placeholder="请输入要转换的文字"
                  />
                </FormItem>
              )}
            </FormItem>
          </div>
          <div className={styles.config}>
            <FormItem label={'引擎'} name={['tts', 'engine']}>
              <Select
                options={[
                  {
                    label: 'Edge',
                    value: 'edge',
                  },
                  {
                    label: 'MicroSoft（不稳定）',
                    value: 'microsoft',
                  },
                ]}
              />
            </FormItem>
            <FormItem label={'语言'} name={['tts', 'locale']}>
              <Select options={suportedLocales} />
            </FormItem>
            <FormItem dependencies={[['tts', 'locale']]} noStyle>
              {() => (
                <FormItem
                  label={'语音'}
                  name={['tts', 'voice']}
                  rules={[{ message: '请选择语音', required: true }]}
                >
                  <Select
                    defaultActiveFirstOption
                    disabled={voiceLoading}
                    loading={voiceLoading}
                    options={voices
                      .filter((voice) => voice.locale === form.getFieldValue(['tts', 'locale']))
                      .map((item) => ({
                        label: `${item.DisplayName}-${item.LocalName}`,
                        value: item.ShortName,
                      }))}
                  />
                </FormItem>
              )}
            </FormItem>
            <FormItem label={'语速'} name={['tts', 'speed']}>
              <Slider max={3} min={0} step={0.01} />
            </FormItem>
            <FormItem label={'音调'} name={['tts', 'pitch']}>
              <Slider max={2} min={0} step={0.01} />
            </FormItem>
            <FormFooter>
              <Button
                disabled={!audioUrl}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = audioUrl!;
                  link.download = 'audio.mp3';

                  link.dispatchEvent(
                    new MouseEvent('click', {
                      bubbles: true,
                      cancelable: true,
                      view: window,
                    }),
                  );
                }}
              >
                下载试听片段
              </Button>
              <Button
                htmlType="button"
                loading={loading}
                onClick={() => {
                  const values = form.getFieldsValue();
                  speek({ ...values.tts });
                }}
              >
                试听
              </Button>
              <Button htmlType="submit" type="primary">
                应用
              </Button>
            </FormFooter>
          </div>
        </div>
        <audio ref={ref} />
      </div>
    </Form>
  );
};

export default Config;

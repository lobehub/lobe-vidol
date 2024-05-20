import { PlayCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import React, { CSSProperties, memo, useRef } from 'react';

import { supportedLocales } from '@/constants/tts';
import { speechApi } from '@/services/tts';
import { agentSelectors, useAgentStore } from '@/store/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const ref = useRef<HTMLAudioElement>(null);

  const tts = useAgentStore((s) => agentSelectors.currentAgentTTS(s));
  const sample = supportedLocales.find((item) => item.value === tts?.locale)?.sample;

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
      if (ref.current) {
        ref.current.src = adUrl;
        ref.current.play();
      }
    },
  });

  return (
    <>
      <Button
        htmlType="button"
        type={'primary'}
        style={style}
        className={className}
        icon={<PlayCircleOutlined />}
        loading={loading}
        onClick={() => {
          if (!tts?.locale) {
            message.error('请先选择语言');
            return;
          }
          if (!tts?.voice) {
            message.error('请先选择语音');
            return;
          }
          if (sample) {
            speek({ ...tts, message: sample });
          }
        }}
      >
        试听
      </Button>
      <audio ref={ref} />
    </>
  );
});

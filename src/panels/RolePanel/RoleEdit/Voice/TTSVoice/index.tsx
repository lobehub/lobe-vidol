import { useRequest } from 'ahooks';
import { Select } from 'antd';
import { isEqual } from 'lodash-es';
import React, { CSSProperties, memo, useEffect, useState } from 'react';

import { voiceListApi } from '@/services/tts';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { Voice } from '@/types/tts';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [voices, setVoices] = useState<Voice[]>([]);

  const [tts, updateAgentTTS] = useAgentStore(
    (s) => [agentSelectors.currentAgentTTS(s), s.updateAgentTTS],
    isEqual,
  );

  const { loading: voiceLoading } = useRequest(
    () => {
      if (!tts?.engine) {
        return Promise.resolve({ data: [] });
      }
      return voiceListApi(tts?.engine);
    },
    {
      onSuccess: (res) => {
        setVoices(res.data);
      },
      refreshDeps: [tts?.engine],
    },
  );

  useEffect(() => {
    if (!tts?.locale) {
      return;
    }
    const voice = voices.find((voice) => voice.locale === tts.locale);
    if (voice) {
      updateAgentTTS({ voice: voice.ShortName });
    }
  }, [tts?.locale, tts?.engine]);

  return (
    <Select
      className={className}
      style={style}
      value={tts?.voice}
      disabled={voiceLoading}
      loading={voiceLoading}
      options={voices
        .filter((voice) => voice.locale === tts?.locale)
        .map((item) => ({
          label: `${item.DisplayName}-${item.LocalName}`,
          value: item.ShortName,
        }))}
      onChange={(value) => {
        updateAgentTTS({ voice: value });
      }}
    />
  );
});

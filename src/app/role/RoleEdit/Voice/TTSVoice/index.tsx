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

  const [voice, engine, locale, updateAgentTTS] = useAgentStore(
    (s) => [
      agentSelectors.currentAgentTTS(s)?.voice,
      agentSelectors.currentAgentTTS(s)?.engine,
      agentSelectors.currentAgentTTS(s)?.locale,
      s.updateAgentTTS,
    ],
    isEqual,
  );

  const { loading: voiceLoading } = useRequest(
    () => {
      if (!engine) {
        return Promise.resolve({ data: [] });
      }
      return voiceListApi(engine);
    },
    {
      onSuccess: (res) => {
        setVoices(res.data);
      },
      refreshDeps: [engine],
    },
  );

  useEffect(() => {
    if (!locale) {
      return;
    }
    const voice = voices.find((voice) => voice.locale === locale);
    if (voice) {
      updateAgentTTS({ voice: voice.ShortName });
    }
  }, [locale, engine]);

  return (
    <Select
      className={className}
      style={style}
      value={voice}
      disabled={voiceLoading}
      loading={voiceLoading}
      options={voices
        .filter((voice) => voice.locale === locale)
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

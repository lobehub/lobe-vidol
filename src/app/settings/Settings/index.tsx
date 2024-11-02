import { TabsNav } from '@lobehub/ui';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import OpenAIConfig from '@/app/settings/Settings/llm/openai';

import CommonConfig from './common';
import Touch from './touch';
import TTSConfig from './tts';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('common');
  const { t } = useTranslation('settings');

  return (
    <Flexbox flex={1} className={className} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'common',
              label: t('common.title'),
            },
            {
              key: 'languageModel',
              label: t('llm.title'),
            },
            {
              key: 'touch',
              label: t('touch.title'),
            },
            {
              key: 'tts',
              label: t('tts.title'),
            },
          ]}
          onChange={(key) => {
            setTab(key);
          }}
        />
      </div>
      <Flexbox flex={1} width={'100%'} height={'100%'}>
        {tab === 'languageModel' ? <OpenAIConfig /> : null}
        {tab === 'common' ? <CommonConfig /> : null}
        {tab === 'touch' ? <Touch /> : null}
        {tab === 'tts' ? <TTSConfig /> : null}
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Config);

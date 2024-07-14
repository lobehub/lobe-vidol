import { TabsNav } from '@lobehub/ui';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import CommonConfig from './common';
import OpenAIConfig from './model/openai';
import Touch from './touch';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('common');
  const { t } = useTranslation('common');

  return (
    <Flexbox flex={1} width={'100%'} height={'100%'} className={className} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'common',
              label: t('commonSetting'),
            },
            {
              key: 'languageModel',
              label: t('languageModel'),
            },
            {
              key: 'touch',
              label: t('touchSetting'),
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
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Config);

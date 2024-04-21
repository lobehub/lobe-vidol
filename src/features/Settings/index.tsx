import { TabsNav } from '@lobehub/ui';
import React, { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import CommonConfig from './common';
import OpenAIConfig from './model/openai';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('common');

  return (
    <Flexbox flex={1} width={'100%'} height={'100%'} className={className} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'common',
              label: '通用设置',
            },
            {
              key: 'languageModel',
              label: '语言模型',
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
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Config);

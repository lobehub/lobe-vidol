import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import CommonConfig from './common';
import OpenAIConfig from './model/openai';
import { useStyles } from './style';

interface ConfigProps {
  className?: string;
  style?: React.CSSProperties;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('common');

  return (
    <div className={classNames(styles.container, className)} style={style}>
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
      <div className={styles.content}>
        {tab === 'languageModel' ? <OpenAIConfig /> : null}
        {tab === 'common' ? <CommonConfig /> : null}
      </div>
    </div>
  );
};

export default memo(Config);

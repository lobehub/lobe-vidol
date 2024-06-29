'use client';

import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Info from './Info';
import Model from './Model';
import Role from './Role';
import Voice from './Voice';
import { useStyles } from './style';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { styles } = useStyles();
  const { className, style } = props;
  const [tab, setTab] = useState('info');
  const { t } = useTranslation('panel');

  return (
    <div className={classNames(styles.edit, className)} style={style}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          items={[
            {
              key: 'info',
              label: t('nav.info'),
            },
            {
              key: 'role',
              label: t('nav.role'),
            },
            {
              key: 'voice',
              label: t('nav.voice'),
            },
            {
              key: 'model',
              label: t('nav.model'),
            },
          ]}
          // tabBarExtraContent={<SubmitAgentButton modal />}
          onChange={(key) => {
            setTab(key);
          }}
        />
      </div>
      <div className={styles.content}>
        {tab === 'info' ? <Info /> : null}
        {tab === 'role' ? <Role /> : null}
        {tab === 'voice' ? <Voice /> : null}
        {tab === 'model' ? <Model /> : null}
      </div>
    </div>
  );
};

export default RolePanel;

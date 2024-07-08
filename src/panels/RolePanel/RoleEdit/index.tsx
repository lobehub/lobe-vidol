'use client';

import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SubmitAgentButton from '@/features/Actions/SubmitAgentButton';

import Info from './Info';
import LangModel from './LangModel';
import Model from './Model';
import Role from './Role';
import Touch from './Touch';
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
      <Flexbox horizontal flex={1} gap={12}>
        <Flexbox flex={2}>
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
                  key: 'touch',
                  label: t('nav.touch'),
                },
                {
                  key: 'langModel',
                  label: '语言模型',
                },
              ]}
              tabBarExtraContent={<SubmitAgentButton modal />}
              onChange={(key) => {
                setTab(key);
              }}
            />
          </div>
          <div className={styles.content}>
            {tab === 'info' ? <Info /> : null}
            {tab === 'role' ? <Role /> : null}
            {tab === 'voice' ? <Voice /> : null}
            {tab === 'touch' ? <Touch /> : null}
            {tab === 'langModel' ? <LangModel /> : null}
          </div>
        </Flexbox>
        <Flexbox flex={1}>
          <Model />
        </Flexbox>
      </Flexbox>
    </div>
  );
};

export default RolePanel;

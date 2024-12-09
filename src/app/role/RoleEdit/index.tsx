'use client';

import { TabsNav } from '@lobehub/ui';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Info from './Info';
import LangModel from './LangModel';
import Role from './Role';
import Shell from './Shell';
import Voice from './Voice';
import RoleBookButton from './actions/RoleBook';
import SubmitAgentButton from './actions/SubmitAgentButton';
import ToogleRoleList from './actions/ToogleRoleList';
import { useStyles } from './style';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const RolePanel = (props: RolePanelProps) => {
  const { styles } = useStyles();
  const { md = true } = useResponsive();
  const { className, style } = props;
  const [tab, setTab] = useState('info');
  const { t } = useTranslation('role');

  return (
    <Flexbox flex={1} gap={12} className={classNames(styles.container, className)} style={style}>
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
            key: 'shell',
            label: t('nav.shell'),
          },
          {
            key: 'llm',
            label: t('nav.llm'),
          },
        ]}
        tabBarExtraContent={{
          left: <ToogleRoleList />,
          right: (
            <Flexbox horizontal gap={8}>
              <RoleBookButton modal={md} />
              <SubmitAgentButton modal={md} />
            </Flexbox>
          ),
        }}
        onChange={(key) => {
          setTab(key);
        }}
      />
      {tab === 'info' ? <Info /> : null}
      {tab === 'role' ? <Role /> : null}
      {tab === 'voice' ? <Voice /> : null}
      {tab === 'shell' ? <Shell /> : null}
      {tab === 'llm' ? <LangModel /> : null}
    </Flexbox>
  );
};

export default RolePanel;

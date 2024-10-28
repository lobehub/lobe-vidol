'use client';

import { BookOutlined } from '@ant-design/icons';
import { TabsNav } from '@lobehub/ui';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Info from './Info';
import LangModel from './LangModel';
import Role from './Role';
import Touch from './Touch';
import Voice from './Voice';
import SubmitAgentButton from './actions/SubmitAgentButton';
import { useStyles } from './style';

interface RolePanelProps {
  className?: string;
  style?: React.CSSProperties;
}

const handleOpenDocs = () => {
  window.open('https://docs.vidol.chat/role-manual/quickstart/introduction', '_blank');
};

const RolePanel = (props: RolePanelProps) => {
  const { styles } = useStyles();
  const { className, style } = props;
  const [tab, setTab] = useState('info');
  const { t } = useTranslation('role');

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
                  key: 'llm',
                  label: t('nav.llm'),
                },
              ]}
              tabBarExtraContent={
                <Flexbox horizontal gap={8}>
                  <Button icon={<BookOutlined />} onClick={handleOpenDocs}>
                    {t('roleBook')} {/* 需要在翻译文件中添加对应的翻译 */}
                  </Button>
                  <SubmitAgentButton modal />
                </Flexbox>
              }
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
            {tab === 'llm' ? <LangModel /> : null}
          </div>
        </Flexbox>
      </Flexbox>
    </div>
  );
};

export default RolePanel;

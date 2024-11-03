import { Icon, SearchBar } from '@lobehub/ui';
import { Collapse } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SkeletonList from '@/components/SkeletonList';

import Elsa from './List/Elsa';

const List = dynamic(() => import('./List'), {
  ssr: false,
  loading: () => <SkeletonList style={{ marginTop: 8 }} />,
});

const useStyles = createStyles(({ css, token, prefixCls }) => ({
  role: css`
    overflow-y: auto;
    height: 100%;
  `,
  list: css`
    padding: 8px;
  `,
  container: css`
    .${prefixCls}-collapse-header {
      padding-inline: 8px !important;
      color: ${token.colorTextDescription} !important;
      border-radius: ${token.borderRadius}px !important;

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillTertiary};
        .${prefixCls}-collapse-extra {
          display: block;
        }
      }
    }
    .${prefixCls}-collapse-extra {
      display: none;
    }
    .${prefixCls}-collapse-content {
      border-radius: 0 !important;
    }
    .${prefixCls}-collapse-content-box {
      padding: 0 !important;
    }
  `,
  icon: css`
    transition: all 100ms ${token.motionEaseOut};
  `,
}));

const RoleList = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();
  const { t } = useTranslation('role');

  return (
    <div className={styles.role}>
      <Flexbox style={{ padding: '16px 8px 0' }}>
        <SearchBar
          enableShortKey
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          placeholder={t('search', { ns: 'common' })}
          shortKey="f"
          spotlight
          type={'block'}
          value={searchName}
        />
      </Flexbox>
      <div className={styles.list}>
        <Elsa />
        <Collapse
          bordered={false}
          defaultActiveKey={'default'}
          className={styles.container}
          expandIcon={({ isActive }) => (
            <Icon
              className={styles.icon}
              icon={ChevronDown}
              size={{ fontSize: 16 }}
              style={isActive ? {} : { rotate: '-90deg' }}
            />
          )}
          expandIconPosition={'end'}
          ghost
          size={'small'}
          items={[
            {
              children: <List filter={searchName} />,
              label: t('roleList'),
              key: 'default',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default RoleList;

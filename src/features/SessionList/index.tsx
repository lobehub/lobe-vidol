import { Icon, SearchBar } from '@lobehub/ui';
import { Collapse } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Agent from '@/features/Actions/Agent';

import List from './List';
import V from './V';

const useStyles = createStyles(({ css, token, prefixCls }) => ({
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

const SideBar = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();

  return (
    <div className={styles.list}>
      <Flexbox justify={'space-between'} horizontal align={'center'} style={{ marginBottom: 8 }}>
        <SearchBar
          enableShortKey
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          placeholder="搜索"
          shortKey="f"
          spotlight
          type={'block'}
          value={searchName}
        />
        <Agent />
      </Flexbox>
      <V />
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
            label: '会话列表',
            key: 'default',
          },
        ]}
      />
    </div>
  );
};

export default SideBar;

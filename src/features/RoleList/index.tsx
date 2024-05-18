import { Icon, SearchBar } from '@lobehub/ui';
import { Collapse } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { HEADER_HEIGHT } from '@/constants/token';
import Agent from '@/features/Actions/Agent';
import Elsa from '@/features/RoleList/List/Elsa';

import List from './List';

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
    <>
      <Flexbox
        justify={'space-between'}
        horizontal
        align={'center'}
        style={{ height: HEADER_HEIGHT, padding: '8px 8px 0' }}
      >
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
              label: '角色列表',
              key: 'default',
            },
          ]}
        />
      </div>
    </>
  );
};

export default SideBar;

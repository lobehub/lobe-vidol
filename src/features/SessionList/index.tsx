import { Icon } from '@lobehub/ui';
import { Collapse } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import List from './List';
import SearchBar from './SearchBar';
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
      <SearchBar
        onChange={(value) => {
          setSearchName(value);
        }}
        value={searchName}
        style={{ marginBottom: 8 }}
      />
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
            label: '默认列表',
            key: 'default',
          },
        ]}
      />
    </div>
  );
};

export default SideBar;

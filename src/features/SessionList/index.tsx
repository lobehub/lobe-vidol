import { DraggablePanel, Icon } from '@lobehub/ui';
import { Collapse } from 'antd';
import { createStyles } from 'antd-style';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/common';
import V from '@/features/SessionList/V';

import Header from './Header';
import List from './List';

const useStyles = createStyles(({ css, token, prefixCls }) => ({
  content: css`
    display: flex;
    flex-direction: column;
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

const SideBar = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();

  return (
    <DraggablePanel
      className={styles.content}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
    >
      <Header
        onChange={(value) => {
          setSearchName(value);
        }}
        value={searchName}
      />
      <div className={styles.list}>
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
    </DraggablePanel>
  );
};

export default SideBar;

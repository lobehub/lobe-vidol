import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { useState } from 'react';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/common';

import Header from './Header';
import List from './List';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
  list: css`
    padding: 8px;
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
        <List filter={searchName} />
      </div>
    </DraggablePanel>
  );
};

export default SideBar;

import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { useState } from 'react';

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
      maxWidth={360}
      minWidth={280}
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

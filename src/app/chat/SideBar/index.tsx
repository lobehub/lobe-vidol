import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/common';
import SessionList from '@/features/SessionList';

const useStyles = createStyles(({ css }) => ({
  sidebar: css`
    display: flex;
    flex-direction: column;
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();

  return (
    <DraggablePanel
      className={styles.sidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      placement={'left'}
    >
      <SessionList />
    </DraggablePanel>
  );
};

export default SideBar;

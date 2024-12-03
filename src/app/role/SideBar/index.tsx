import { DraggablePanel } from '@lobehub/ui';
import { createStyles, useResponsive } from 'antd-style';
import { isEqual } from 'lodash-es';
import { rgba } from 'polished';
import { useEffect, useState } from 'react';

import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { useGlobalStore } from '@/store/global';

import RoleList from './RoleList';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  sidebar: css`
    z-index: 10;
    background-color: ${rgba(token.colorBgLayout, 0.2)};
    backdrop-filter: saturate(180%) blur(8px);
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [showRoleList, setRoleList] = useGlobalStore((s) => [s.showRoleList, s.setRoleList]);

  const { md = true } = useResponsive();

  const [cacheExpand, setCacheExpand] = useState<boolean>(Boolean(showRoleList));

  const handleExpand = (expand: boolean) => {
    if (isEqual(expand, Boolean(showRoleList))) return;
    setRoleList(expand);
    setCacheExpand(expand);
  };

  useEffect(() => {
    if (md && cacheExpand) setRoleList(true);
    if (!md) setRoleList(false);
  }, [md, cacheExpand]);

  return (
    <DraggablePanel
      className={styles.sidebar}
      classNames={{ content: styles.content }}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={md ? 'fixed' : 'float'}
      placement={'left'}
      onExpandChange={handleExpand}
      expand={showRoleList}
    >
      <RoleList />
    </DraggablePanel>
  );
};

export default SideBar;

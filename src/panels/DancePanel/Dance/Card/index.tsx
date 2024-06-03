import { DraggablePanel } from '@lobehub/ui';
import { Button, Popconfirm, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { memo, useState } from 'react';

import DanceInfo from '@/components/DanceInfo';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_WIDTH } from '@/constants/token';
import { danceListSelectors, useDanceStore } from '@/store/dance';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo(() => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [
    showDanceSidebar,
    activateDance,
    deactivateDance,
    addAndPlayItem,
    addToPlayList,
    removeDanceItem,
  ] = useDanceStore((s) => [
    danceListSelectors.showSideBar(s),
    s.activateDance,
    s.deactivateDance,
    s.addAndPlayItem,
    s.addToPlayList,
    s.removeDanceItem,
  ]);

  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      defaultSize={{ width: SIDEBAR_WIDTH }}
      expand={showDanceSidebar}
      maxWidth={SIDEBAR_MAX_WIDTH}
      minWidth={SIDEBAR_WIDTH}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useDanceStore.getState().currentIdentifier);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DanceInfo
        actions={[
          <Button
            key="play"
            onClick={() => {
              if (currentDance) {
                addAndPlayItem(currentDance);
              }
            }}
            type={'primary'}
          >
            播放
          </Button>,
          <Button
            key="addAndPlay"
            onClick={() => {
              if (currentDance) {
                addToPlayList(currentDance);
                message.success('已添加到播放列表');
              }
            }}
          >
            添加到列表
          </Button>,
          <Popconfirm
            cancelText="取消"
            description={`确定取消订阅音乐【${currentDance?.name}】吗？`}
            key="delete"
            okText="确定"
            onConfirm={() => {
              if (currentDance) {
                removeDanceItem(currentDance.danceId);
              }
            }}
            title="取消订阅？"
          >
            <Button danger>取消订阅</Button>
          </Popconfirm>,
        ]}
        dance={currentDance}
      />
    </DraggablePanel>
  );
});

export default SideBar;

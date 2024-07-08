import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { Eraser, Music } from 'lucide-react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '@/store/global';
import { useSessionStore } from '@/store/session';

import Item from './Item';

const { confirm } = Modal;

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useGlobalStore((s) => [s.openPanel]);
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);
  const { t } = useTranslation(['panel', 'common']);
  const items = [
    // {
    //   icon: SquarePen,
    //   label: '新话题',
    //   key: 'new-topic',
    //   onClick: () => {},
    // },
    // {
    //   icon: History,
    //   label: '聊天历史记录',
    //   key: 'history',
    //   onClick: () => {
    //     // openPanel('role');
    //   },
    // },
    // {
    //   icon: Settings2Icon,
    //   label: '对话设定',
    //   key: 'setting',
    //   onClick: () => {
    //     Modal.info({ title: '对话设定', content: '暂未开放' });
    //   },
    // },
    // {
    //   icon: VideoIcon,
    //   key: 'video',
    //   label: '交互模式',
    //   actions: <ViewerMode />,
    // },
    {
      icon: Music,
      key: 'music',
      label: t('dance.musicAndDance'),
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: Eraser,
      label: t('actions.clearContext'),
      key: 'context',
      onClick: () => {
        confirm({
          title: t('actions.clearHistoryTitle'),
          icon: <ExclamationCircleFilled />,
          content: t('actions.clearHistoryTip'),
          okText: t('confirm'),
          cancelText: t('cancel'),
          onOk() {
            clearHistory();
          },
          onCancel() {},
        });
      },
    },
  ];

  return (
    <>
      {items.map(({ icon, label, onClick }) => (
        <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
      ))}
    </>
  );
});

export default Operations;

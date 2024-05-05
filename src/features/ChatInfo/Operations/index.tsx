import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { Eraser, Music, Settings2Icon } from 'lucide-react';
import React, { memo } from 'react';

import { LOBE_VIDOL_DEFAULT_AGENT_ID } from '@/constants/agent';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';

import Item from './Item';

const { confirm } = Modal;

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [clearHistory, activeId] = useSessionStore((s) => [s.clearHistory, s.activeId]);

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
    {
      icon: Settings2Icon,
      label: '角色设定',
      key: 'setting',
      onClick: () => {
        openPanel('role');
      },
      hidden: activeId === LOBE_VIDOL_DEFAULT_AGENT_ID,
    },
    {
      icon: Music,
      key: 'music',
      label: '音乐与舞蹈',
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: Eraser,
      label: '清除上下文',
      key: 'context',
      onClick: () => {
        confirm({
          title: '确定删除历史消息？',
          icon: <ExclamationCircleFilled />,
          content: '该操作不可逆，请谨慎操作',
          okText: '确定',
          cancelText: '取消',
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
      {items
        .filter((item) => !item.hidden)
        .map(({ icon, label, onClick }) => (
          <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
        ))}
    </>
  );
});

export default Operations;

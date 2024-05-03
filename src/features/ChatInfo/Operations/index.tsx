import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { Eraser, Music, SquarePen } from 'lucide-react';
import React, { memo } from 'react';

import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';

import Item from './Item';

const { confirm } = Modal;

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [clearHistory] = useSessionStore((s) => [s.clearHistory]);

  const items = [
    {
      icon: SquarePen,
      label: '角色信息与对话设置',
      onClick: () => {
        openPanel('role');
      },
    },
    {
      icon: Music,
      label: '音乐与舞蹈控制',
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: Eraser,
      label: '清除上下文',
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
      {items.map(({ icon, label, onClick }) => (
        <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
      ))}
    </>
  );
});

export default Operations;

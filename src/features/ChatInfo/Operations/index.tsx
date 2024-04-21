import { ListMusic, Music2, SquarePen } from 'lucide-react';
import React, { memo, useState } from 'react';

import PlayList from '@/features/AudioPlayer/PlayList';
import { useConfigStore } from '@/store/config';

import Item from './Item';

export interface MyListProps {
  mobile?: boolean;
}

const Operations = memo<MyListProps>(({ mobile }) => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [open, setOpen] = useState(false);

  const items = [
    {
      icon: SquarePen,
      label: '角色与对话设置',
      onClick: () => {
        openPanel('role');
      },
    },
    {
      icon: Music2,
      label: '歌舞唱见',
      onClick: () => {
        openPanel('dance');
      },
    },
    {
      icon: ListMusic,
      label: '当前播放列表',
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  return (
    <>
      <PlayList onClose={() => setOpen(false)} open={open} />
      {items.map(({ icon, label, onClick }) => (
        <Item hoverable={!mobile} icon={icon} label={label} key={label} onClick={onClick} />
      ))}
    </>
  );
});

export default Operations;

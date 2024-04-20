'use client';

import Dialog from '@/app/home/Dialog';
import Docker from '@/app/home/Docker';
import VirtualIdol from '@/app/home/VirtualIdol';
import Background from '@/components/Background';

const Desktop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
      <div style={{ height: 'calc(100vh - 64px - 64px)' }}>
        <VirtualIdol />
        <Background />
      </div>
      <Docker />
      <Dialog />
    </div>
  );
};

export default Desktop;

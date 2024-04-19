'use client';

import Background from '@/app/home/Background';
import Dialog from '@/app/home/Dialog';
import Docker from '@/app/home/Docker';
import QuickSwitch from '@/app/home/QuickSwitch';
import VirtualIdol from '@/app/home/VirtualIdol';

const Desktop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
      <div style={{ height: 'calc(100vh - 64px - 64px)' }}>
        <VirtualIdol />
      </div>
      <Docker />
      <QuickSwitch />
      <Dialog />
      <Background />
    </div>
  );
};

export default Desktop;

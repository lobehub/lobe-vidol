'use client';

import { ActionIcon } from '@lobehub/ui';
import { Share2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

const ShareModal = dynamic(() => import('./ShareModal'), { ssr: false });
interface ShareButtonProps {
  className?: string;
  // open?: boolean;
  // setOpen?: (open: boolean) => void;
  style?: React.CSSProperties;
}

const ShareButton = memo<ShareButtonProps>(({ className, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLoading] = useSessionStore((s) => [s.shareLoading]);
  const { t } = useTranslation('chat');
  return (
    <>
      <ActionIcon
        className={className}
        style={style}
        icon={Share2}
        loading={shareLoading}
        onClick={() => setIsModalOpen(true)}
        size={DESKTOP_HEADER_ICON_SIZE}
        title={t('actions.share')}
      />
      <ShareModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default ShareButton;

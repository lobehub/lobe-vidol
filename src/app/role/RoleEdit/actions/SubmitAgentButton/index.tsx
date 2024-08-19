import { ActionIcon, Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { Share2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';

import SubmitAgentModal from './SubmitAgentModal';

const SubmitAgentButton = memo<{ modal?: boolean }>(({ modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('common');
  const shareToMarket = t('share.shareToMarket');
  return (
    <>
      {modal ? (
        <Button block icon={<Icon icon={Share2} />} onClick={() => setIsModalOpen(true)}>
          {shareToMarket}
        </Button>
      ) : (
        <ActionIcon
          icon={Share2}
          onClick={() => setIsModalOpen(true)}
          size={DESKTOP_HEADER_ICON_SIZE}
          title={shareToMarket}
        />
      )}
      <SubmitAgentModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default SubmitAgentButton;

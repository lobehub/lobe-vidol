import { ActionIcon, Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { Share2 } from 'lucide-react';
import { memo, useState } from 'react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';

import SubmitAgentModal from './SubmitAgentModal';

const SubmitAgentButton = memo<{ modal?: boolean }>(({ modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {modal ? (
        <Button block icon={<Icon icon={Share2} />} onClick={() => setIsModalOpen(true)}>
          分享到助手市场
        </Button>
      ) : (
        <ActionIcon
          icon={Share2}
          onClick={() => setIsModalOpen(true)}
          size={DESKTOP_HEADER_ICON_SIZE}
          title={'分享到助手市场'}
        />
      )}
      <SubmitAgentModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default SubmitAgentButton;

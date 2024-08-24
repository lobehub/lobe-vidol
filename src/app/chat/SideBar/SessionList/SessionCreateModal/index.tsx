import { ActionIcon, Modal } from '@lobehub/ui';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';

import Market from './Market';
import { useStyles } from './style';

export default () => {
  const { t } = useTranslation('chat');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { styles } = useStyles();

  return (
    <>
      <ActionIcon
        icon={PlusCircle}
        title={t('sessionCreate')}
        size={DESKTOP_HEADER_ICON_SIZE}
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        footer={null}
        width={900}
        bodyProps={{
          className: styles.modalBody,
        }}
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen}
        title={t('market')}
      >
        <Market />
      </Modal>
    </>
  );
};

import { Modal } from '@lobehub/ui';
import { useTranslation } from 'react-i18next';

import Market from './Market';
import { useStyles } from './style';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default (props: Props) => {
  const { open, setOpen } = props;
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  return (
    <Modal
      allowFullscreen
      footer={null}
      width={900}
      bodyProps={{
        className: styles.modalBody,
      }}
      onCancel={() => setOpen(false)}
      open={open}
      title={t('musicAndDance', { ns: 'dance' })}
    >
      <Market />
    </Modal>
  );
};

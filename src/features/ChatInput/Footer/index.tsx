import { ChatSendButton } from '@lobehub/ui';
import { useTranslation } from 'react-i18next';

import useChatInput from '../../../hooks/useSendMessage';

const Footer = () => {
  const onSend = useChatInput();
  const { t } = useTranslation('common');

  return (
    <ChatSendButton onSend={onSend} texts={{ send: t('actions.send'), warp: t('actions.warp') }} />
  );
};

export default Footer;

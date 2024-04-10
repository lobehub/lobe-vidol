import { ChatSendButton } from '@lobehub/ui';
import useChatInput from '../../../hooks/useSendMessage';

const Footer = () => {
  const onSend = useChatInput();
  return <ChatSendButton onSend={onSend} texts={{ send: '发送', warp: '换行' }} />;
};

export default Footer;

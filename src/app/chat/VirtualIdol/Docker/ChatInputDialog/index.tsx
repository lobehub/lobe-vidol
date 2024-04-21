import Record from '@/features/ChatInput/Actions/Record';
import Log from '@/features/ChatInput/Actions/Log';
import Dance from '@/features/ChatInput/Actions/Dance';
import { Space } from 'antd';
import MessageInput from "@/features/ChatInput/MessageInput";

export default () => {

  return (
    <Space size={4}>
      <MessageInput />
      <Record />
      <Log />
      <Dance />
    </Space>
  );
};


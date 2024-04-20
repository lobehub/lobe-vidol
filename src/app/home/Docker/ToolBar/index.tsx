import Record from '@/features/ChatInput/Actions/Record';
import Voice from '@/features/ChatInput/Actions/Voice';
import { useConfigStore } from '@/store/config';
import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { History } from 'lucide-react';

const ToolBar = () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  return (
    <Space size={4}>
      <ActionIcon
        icon={History}
        onClick={() => {
          openPanel('chat');
        }}
        title={'聊天记录'}
      />
      <Record />
      <Voice />
    </Space>
  );
};

export default ToolBar;

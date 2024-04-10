import Record from '@/features/ChatInput/Actions/Record';
import Voice from '@/features/ChatInput/Actions/Voice';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Segmented, Space } from 'antd';
import { History } from 'lucide-react';

const ToolBar = () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    setViewerMode: s.setViewerMode,
    viewerMode: s.viewerMode,
  }));

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
      <Segmented
        onChange={(value) => {
          if (value === 'true') {
            setViewerMode(true);
          } else {
            setViewerMode(false);
          }
        }}
        options={[
          { label: '3D', value: 'true' },
          { label: '立绘', value: 'false' },
        ]}
        value={viewerMode ? 'true' : 'false'}
      />
    </Space>
  );
};

export default ToolBar;

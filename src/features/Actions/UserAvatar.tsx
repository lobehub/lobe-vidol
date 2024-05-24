import { Space, Typography } from 'antd';

import Avatar from '@/components/Avatar';
import { useSettingStore } from '@/store/setting';

export default () => {
  const [avatar, nickName] = useSettingStore((s) => [s.config.avatar, s.config.nickName]);

  return (
    <Space align={'center'} size={4}>
      <Avatar size={32} avatar={avatar} />
      <Typography.Text>{nickName}</Typography.Text>
    </Space>
  );
};

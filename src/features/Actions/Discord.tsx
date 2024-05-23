import { SiDiscord } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <ActionIcon
      icon={SiDiscord}
      key="discord"
      title={'社区支持'}
      onClick={() => window.open('https://discord.gg/AYFPHvv2jT', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

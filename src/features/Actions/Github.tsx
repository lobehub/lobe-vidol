import { SiGithub } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <ActionIcon
      icon={SiGithub}
      key="github"
      title={'✨ GitHub'}
      onClick={() => window.open('https://github.com/lobehub/lobe-vidol', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

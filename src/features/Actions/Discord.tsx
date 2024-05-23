import { SiDiscord } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles, useTheme } from 'antd-style';

const useStyles = createStyles(({ css, token }) => {
  return {
    icon: css`
      svg {
        fill: ${token.colorTextDescription};
      }

      &:hover {
        svg {
          fill: ${token.colorText};
        }
      }
    `,
  };
});

export default () => {
  const { styles } = useStyles();
  const theme = useTheme();
  return (
    <ActionIcon
      className={styles.icon}
      icon={SiDiscord}
      key="discord"
      title={'社区支持'}
      onClick={() => window.open('https://discord.gg/AYFPHvv2jT', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

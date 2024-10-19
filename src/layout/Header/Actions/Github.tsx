import { SiGithub } from '@icons-pack/react-simple-icons';
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
  const theme = useTheme();

  const { styles } = useStyles();
  return (
    <ActionIcon
      className={styles.icon}
      icon={SiGithub}
      key="github"
      title={'✨ Github'}
      onClick={() => window.open('https://github.com/lobehub/lobe-vidol', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

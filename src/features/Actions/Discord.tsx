import { SiDiscord } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles, useTheme } from 'antd-style';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('features');
  return (
    <ActionIcon
      className={styles.icon}
      icon={SiDiscord}
      key="discord"
      title={t('support')}
      onClick={() => window.open('https://discord.gg/AYFPHvv2jT', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

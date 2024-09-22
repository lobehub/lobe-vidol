import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Pointer, PointerOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';
import { useSessionStore } from '@/store/session';

const useStyles = createStyles(({ token, css }) => ({
  icon: css`
    cursor: pointer;
    transition: color 0.3s;
  `,
  on: css`
    color: ${token.colorLinkActive};
  `,
}));

const InteractiveSwitch = () => {
  const { styles } = useStyles();
  const [interactive, toggleInteractive] = useSessionStore((s) => [
    s.interactive,
    s.toggleInteractive,
  ]);
  const { t } = useTranslation('chat');
  return (
    <ActionIcon
      className={classNames(styles.icon, interactive && styles.on)}
      icon={interactive ? Pointer : PointerOff}
      onClick={toggleInteractive}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={t('interactive')}
    />
  );
};

export default InteractiveSwitch;

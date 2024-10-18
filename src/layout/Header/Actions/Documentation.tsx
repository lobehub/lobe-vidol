import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Documentation = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  return (
    <ActionIcon
      icon={Book}
      key="documentation"
      title={t('documentation')}
      onClick={() => window.open('https://docs.vidol.chat/', '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

export default Documentation;

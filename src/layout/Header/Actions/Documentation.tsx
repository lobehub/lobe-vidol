import { ActionIcon } from '@lobehub/ui';
import { useTheme } from 'antd-style';
import { Book } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DOCUMENTS_REFER_URL } from '@/constants/url';

export const Documentation = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  return (
    <ActionIcon
      icon={Book}
      key="documentation"
      title={t('userPanel.docs')}
      onClick={() => window.open(DOCUMENTS_REFER_URL, '_blank')}
      style={{ border: `1px solid ${theme.colorFillSecondary}` }}
    />
  );
};

export default Documentation;

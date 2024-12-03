import { ActionIcon, Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { Book } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE } from '@/constants/token';

const handleOpenDocs = () => {
  window.open('https://docs.vidol.chat/role-manual/quickstart/introduction', '_blank');
};

const RoleBookButton = memo<{ modal?: boolean }>(({ modal }) => {
  const { t } = useTranslation('role');
  return modal ? (
    <Button icon={<Icon icon={Book} />} onClick={handleOpenDocs}>
      {t('roleBook')}
    </Button>
  ) : (
    <ActionIcon
      icon={Book}
      onClick={handleOpenDocs}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={t('roleBook')}
    />
  );
});

export default RoleBookButton;

import { ActionIcon } from '@lobehub/ui';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const EditRole = () => {
  const { t } = useTranslation('chat');
  const router = useRouter();
  return (
    <ActionIcon
      icon={Edit}
      title={t('editRole.action')}
      onClick={() => {
        router.push('/role');
      }}
    />
  );
};

export default EditRole;

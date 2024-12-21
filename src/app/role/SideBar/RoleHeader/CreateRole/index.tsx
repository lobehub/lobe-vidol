import { ActionIcon, Modal } from '@lobehub/ui';
import { Avatar, Button, message } from 'antd';
import { createStyles } from 'antd-style';
import { MessageSquarePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from '@/components/ListItem';
import { useAgentStore } from '@/store/agent';
import { GenderEnum } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  genderList: css`
    display: flex;
    gap: 16px;
    margin-top: 24px;
  `,
  genderCard: css`
    cursor: pointer;

    flex: 1;

    padding: 16px;

    text-align: center;

    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    &:hover {
      border-color: ${token.colorPrimary};
    }

    &.selected {
      border-color: ${token.colorPrimary};
    }
  `,
  createButton: css`
    width: 100%;
    margin-top: 24px;
  `,
}));

export default function CreateRole() {
  const { t } = useTranslation('role');
  const { styles } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<GenderEnum | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const createNewAgent = useAgentStore((s) => s.createNewAgent);

  const handleCreateRole = async () => {
    if (!selectedGender) return;

    try {
      setLoading(true);
      await createNewAgent(selectedGender);
      router.push(`/role`);
      setIsModalOpen(false);
    } catch (error) {
      console.error('create role failed:', error);
      message.error(t('role.createRoleFailed'));
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    {
      key: GenderEnum.MALE,
      label: t('agent.male'),
      icon: 'https://oss.vidol.chat/docs/2024/12/8fc3717dd8f190f26cf204789d54b297.png',
    },
    {
      key: GenderEnum.FEMALE,
      label: t('agent.female'),
      icon: 'https://oss.vidol.chat/docs/2024/12/6c45a6c800590acdb782ab905939fa04.png',
    },
  ];

  return (
    <>
      <ActionIcon
        onClick={() => setIsModalOpen(true)}
        icon={MessageSquarePlus}
        size="large"
        title={t('role.create')}
      />

      <Modal
        allowFullscreen
        height={360}
        title={t('role.selectGender')}
        open={isModalOpen}
        footer={
          <Button
            className={styles.createButton}
            type="primary"
            disabled={!selectedGender || loading}
            onClick={handleCreateRole}
            loading={loading}
          >
            {t('role.create')}
          </Button>
        }
        width={480}
        onCancel={() => !loading && setIsModalOpen(false)}
        closable={!loading}
        maskClosable={!loading}
      >
        <div className={styles.genderList}>
          {genderOptions.map((option) => (
            <ListItem
              key={option.key}
              avatar={<Avatar src={option.icon} size={120} />}
              className={`${styles.genderCard} ${selectedGender === option.key ? 'selected' : ''}`}
              onClick={() => setSelectedGender(option.key as GenderEnum)}
              active={selectedGender === option.key}
              title={option.label}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}

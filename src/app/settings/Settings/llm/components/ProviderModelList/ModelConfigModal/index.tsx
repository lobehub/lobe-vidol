import { Modal } from '@lobehub/ui';
import { Button, FormInstance } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingStore } from '@/store/setting';
import { modelConfigSelectors } from '@/store/setting/selectors';

import ModelConfigForm from './Form';

interface ModelConfigModalProps {
  provider?: string;
  showAzureDeployName?: boolean;
}

const ModelConfigModal = memo<ModelConfigModalProps>(({ showAzureDeployName, provider }) => {
  const { t } = useTranslation('settings');
  const { t: tc } = useTranslation('common');
  const [formInstance, setFormInstance] = useState<FormInstance>();

  const [open, id, editingProvider, dispatchCustomModelCards, toggleEditingCustomModelCard] =
    useSettingStore((s) => [
      !!s.editingCustomCardModel && provider === s.editingCustomCardModel?.provider,
      s.editingCustomCardModel?.id,
      s.editingCustomCardModel?.provider,
      s.dispatchCustomModelCards,
      s.toggleEditingCustomModelCard,
    ]);

  const modelCard = useSettingStore(
    modelConfigSelectors.getCustomModelCard({ id, provider: editingProvider }),
    isEqual,
  );

  const closeModal = () => {
    toggleEditingCustomModelCard(undefined);
  };

  return (
    <Modal
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={closeModal}>
          {tc('cancel')}
        </Button>,

        <Button
          key="ok"
          onClick={() => {
            if (!editingProvider || !id || !formInstance) return;
            const data = formInstance.getFieldsValue();

            dispatchCustomModelCards(editingProvider as any, { id, type: 'update', value: data });

            closeModal();
          }}
          style={{ marginInlineStart: '16px' }}
          type="primary"
        >
          {tc('ok')}
        </Button>,
      ]}
      maskClosable
      onCancel={closeModal}
      open={open}
      title={t('llm.customModelCards.modelConfig.modalTitle')}
      zIndex={1251} // Select is 1150
    >
      <ModelConfigForm
        initialValues={modelCard}
        onFormInstanceReady={setFormInstance}
        showAzureDeployName={showAzureDeployName}
      />
    </Modal>
  );
});
export default ModelConfigModal;

import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_M, INPUT_WIDTH_S } from '@/constants/token';
import { MAX_TOUCH_ACTION_TEXT_LENGTH, TOUCH_EMOTION_OPTIONS } from '@/constants/touch';
import { useAgentStore } from '@/store/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

interface Props {
  index?: number;
  isEdit?: boolean;
  touchAction?: TouchAction;
  touchArea: TouchAreaEnum;
}

export default memo((props: Props) => {
  const { touchArea, index, touchAction, isEdit = true } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation(['common', 'panel']);

  const [updateTouchAction, createTouchAction] = useAgentStore((s) => [
    s.updateTouchAction,
    s.createTouchAction,
  ]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setOpen(false);
      if (isEdit) {
        updateTouchAction(touchArea, index!, values);
      } else {
        createTouchAction(touchArea, values);
      }
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <ActionIcon
        icon={isEdit ? Edit2Icon : Plus}
        title={isEdit ? t('actions.edit') : t('actions.add')}
        onClick={showModal}
      />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={800}
        destroyOnClose
        title={
          isEdit ? t('touch.editAction', { ns: 'panel' }) : t('touch.addAction', { ns: 'panel' })
        }
        okText={t('confirm')}
        cancelText={t('cancel')}
      >
        <Form
          layout="horizontal"
          requiredMark
          initialValues={isEdit ? touchAction : { emotion: VRMExpressionPresetName.Neutral }}
          form={form}
          preserve={false}
        >
          <FormItem
            label={t('info.textLabel', { ns: 'panel' })}
            desc={t('info.textDescription', { ns: 'panel' })}
            name={'text'}
            rules={[{ required: true, message: t('touch.inputDIYText', { ns: 'panel' }) }]}
          >
            <Input.TextArea
              placeholder={t('touch.inputActionText', { ns: 'panel' })}
              maxLength={MAX_TOUCH_ACTION_TEXT_LENGTH}
              showCount
              autoSize
              style={{ width: INPUT_WIDTH_M }}
            />
          </FormItem>
          <FormItem
            label={t('info.emotionLabel', { ns: 'panel' })}
            desc={t('info.emotionDescription', { ns: 'panel' })}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion', { ns: 'panel' }) }]}
            name="emotion"
          >
            <Select
              options={TOUCH_EMOTION_OPTIONS}
              style={{ width: INPUT_WIDTH_S }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});

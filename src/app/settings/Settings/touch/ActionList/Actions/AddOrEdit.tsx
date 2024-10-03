import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_MD, INPUT_WIDTH_SM } from '@/constants/token';
import { MAX_TOUCH_ACTION_TEXT_LENGTH } from '@/constants/touch';
import { motionPresetMap } from '@/libs/emoteController/motionPresetMap';
import { useSettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

export interface Props {
  gender: GenderEnum;
  index?: number;
  isEdit?: boolean;
  touchAction?: TouchAction;
  touchArea: TouchAreaEnum;
}

const AddOrEdit = memo<Props>(({ touchArea, index, touchAction, isEdit = true, gender }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation('role');

  const [updateTouchAction, createTouchAction] = useSettingStore((s) => [
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
        updateTouchAction(gender, touchArea, index!, values);
      } else {
        createTouchAction(gender, touchArea, values);
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
        title={isEdit ? t('actions.edit', { ns: 'chat' }) : t('actions.add', { ns: 'chat' })}
        onClick={showModal}
      />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={800}
        destroyOnClose
        title={
          isEdit ? t('touch.editAction', { ns: 'role' }) : t('touch.addAction', { ns: 'role' })
        }
        okText={t('confirm', { ns: 'common' })}
        cancelText={t('cancel', { ns: 'common' })}
      >
        <Form
          layout="horizontal"
          requiredMark
          initialValues={isEdit ? touchAction : { expression: VRMExpressionPresetName.Neutral }}
          form={form}
          preserve={false}
        >
          <FormItem
            label={t('info.textLabel', { ns: 'role' })}
            desc={t('info.textDescription', { ns: 'role' })}
            name={'text'}
            rules={[{ required: true, message: t('touch.inputDIYText', { ns: 'role' }) }]}
          >
            <Input.TextArea
              placeholder={t('touch.inputActionText', { ns: 'role' })}
              maxLength={MAX_TOUCH_ACTION_TEXT_LENGTH}
              showCount
              autoSize
              style={{ width: INPUT_WIDTH_MD }}
            />
          </FormItem>
          <FormItem
            label={t('info.emotionLabel', { ns: 'role' })}
            desc={t('info.emotionDescription', { ns: 'role' })}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion', { ns: 'role' }) }]}
            name="expression"
          >
            <Select
              options={[
                {
                  label: t('touch.expression.natural', { ns: 'role' }),
                  value: VRMExpressionPresetName.Neutral,
                },
                {
                  label: t('touch.expression.happy', { ns: 'role' }),
                  value: VRMExpressionPresetName.Happy,
                },
                {
                  label: t('touch.expression.angry', { ns: 'role' }),
                  value: VRMExpressionPresetName.Angry,
                },
                {
                  label: t('touch.expression.sad', { ns: 'role' }),
                  value: VRMExpressionPresetName.Sad,
                },
                {
                  label: t('touch.expression.relaxed', { ns: 'role' }),
                  value: VRMExpressionPresetName.Relaxed,
                },
                {
                  label: t('touch.expression.surprised', { ns: 'role' }),
                  value: VRMExpressionPresetName.Surprised,
                },
                {
                  label: t('touch.expression.blink', { ns: 'role' }),
                  value: VRMExpressionPresetName.Blink,
                },
                {
                  label: t('touch.expression.blinkLeft', { ns: 'role' }),
                  value: VRMExpressionPresetName.BlinkLeft,
                },
                {
                  label: t('touch.expression.blinkRight', { ns: 'role' }),
                  value: VRMExpressionPresetName.BlinkRight,
                },
              ]}
              style={{ width: INPUT_WIDTH_SM }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
          <FormItem
            label={t('info.motionLabel', { ns: 'role' })}
            desc={t('info.motionDescription', { ns: 'role' })}
            divider
            rules={[{ required: true, message: t('touch.inputActionMotion', { ns: 'role' }) }]}
            name="motion"
          >
            <Select
              options={Object.entries(motionPresetMap).map(([key, value]) => ({
                label: t(`${value.name}`),
                value: key,
              }))}
              style={{ width: INPUT_WIDTH_SM }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});

export default AddOrEdit;

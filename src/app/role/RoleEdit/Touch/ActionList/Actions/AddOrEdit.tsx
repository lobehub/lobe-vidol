import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_MD, INPUT_WIDTH_SM } from '@/constants/token';
import { MAX_TOUCH_ACTION_TEXT_LENGTH } from '@/constants/touch';
import { MotionPresetName, motionPresetMap } from '@/libs/emoteController/motionPresetMap';
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
  const { t } = useTranslation('role');

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
        title={isEdit ? t('actions.edit', { ns: 'chat' }) : t('actions.add', { ns: 'chat' })}
        onClick={showModal}
      />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={800}
        destroyOnClose
        title={isEdit ? t('touch.editAction') : t('touch.addAction')}
        okText={t('confirm', { ns: 'common' })}
        cancelText={t('cancel', { ns: 'common' })}
      >
        <Form
          layout="horizontal"
          requiredMark
          initialValues={
            isEdit
              ? touchAction
              : {
                  expression: VRMExpressionPresetName.Neutral,
                  motion: MotionPresetName.FemaleHappy,
                }
          }
          form={form}
          preserve={false}
        >
          <FormItem
            label={t('info.textLabel')}
            desc={t('info.textDescription')}
            name={'text'}
            rules={[{ required: true, message: t('touch.inputDIYText') }]}
          >
            <Input.TextArea
              placeholder={t('touch.inputActionText')}
              maxLength={MAX_TOUCH_ACTION_TEXT_LENGTH}
              showCount
              autoSize
              style={{ width: INPUT_WIDTH_MD }}
            />
          </FormItem>
          <FormItem
            label={t('info.emotionLabel')}
            desc={t('info.emotionDescription')}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion') }]}
            name="expression"
          >
            <Select
              options={[
                {
                  label: t('touch.expression.natural'),
                  value: VRMExpressionPresetName.Neutral,
                },
                {
                  label: t('touch.expression.happy'),
                  value: VRMExpressionPresetName.Happy,
                },
                {
                  label: t('touch.expression.angry'),
                  value: VRMExpressionPresetName.Angry,
                },
                {
                  label: t('touch.expression.sad'),
                  value: VRMExpressionPresetName.Sad,
                },
                {
                  label: t('touch.expression.relaxed'),
                  value: VRMExpressionPresetName.Relaxed,
                },
                {
                  label: t('touch.expression.surprised'),
                  value: VRMExpressionPresetName.Surprised,
                },
                {
                  label: t('touch.expression.blink'),
                  value: VRMExpressionPresetName.Blink,
                },
                {
                  label: t('touch.expression.blinkLeft'),
                  value: VRMExpressionPresetName.BlinkLeft,
                },
                {
                  label: t('touch.expression.blinkRight'),
                  value: VRMExpressionPresetName.BlinkRight,
                },
              ]}
              style={{ width: INPUT_WIDTH_SM }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
          <FormItem
            label={t('info.motionLabel')}
            desc={t('info.motionDescription')}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion') }]}
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

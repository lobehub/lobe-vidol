import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_M, INPUT_WIDTH_S } from '@/constants/token';
import {
  HAPPY_MOTION_ID,
  MAX_TOUCH_ACTION_TEXT_LENGTH,
  TOUCH_MOTION_ANIMATION,
} from '@/constants/touch';
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
        title={isEdit ? t('actions.edit', { ns: 'common' }) : t('actions.add', { ns: 'common' })}
        onClick={showModal}
      />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={800}
        destroyOnClose
        title={isEdit ? t('touch.editAction') : t('touch.addAction')}
        okText={t('confirm')}
        cancelText={t('cancel')}
      >
        <Form
          layout="horizontal"
          requiredMark
          initialValues={
            isEdit
              ? touchAction
              : { emotion: VRMExpressionPresetName.Neutral, motion: HAPPY_MOTION_ID }
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
              style={{ width: INPUT_WIDTH_M }}
            />
          </FormItem>
          <FormItem
            label={t('info.emotionLabel')}
            desc={t('info.emotionDescription')}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion') }]}
            name="emotion"
          >
            <Select
              options={[
                {
                  label: t('touch.emotion.natural'),
                  value: VRMExpressionPresetName.Neutral,
                },
                {
                  label: t('touch.emotion.happy'),
                  value: VRMExpressionPresetName.Happy,
                },
                {
                  label: t('touch.emotion.angry'),
                  value: VRMExpressionPresetName.Angry,
                },
                {
                  label: t('touch.emotion.sad'),
                  value: VRMExpressionPresetName.Sad,
                },
                {
                  label: t('touch.emotion.relaxed'),
                  value: VRMExpressionPresetName.Relaxed,
                },
                {
                  label: t('touch.emotion.surprised'),
                  value: VRMExpressionPresetName.Surprised,
                },
                {
                  label: t('touch.emotion.blink'),
                  value: VRMExpressionPresetName.Blink,
                },
                {
                  label: t('touch.emotion.blinkLeft'),
                  value: VRMExpressionPresetName.BlinkLeft,
                },
                {
                  label: t('touch.emotion.blinkRight'),
                  value: VRMExpressionPresetName.BlinkRight,
                },
              ]}
              style={{ width: INPUT_WIDTH_S }}
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
              options={TOUCH_MOTION_ANIMATION.map((item) => ({
                label: `${item.gender}/${item.name}`,
                value: item.id,
              }))}
              style={{ width: INPUT_WIDTH_S }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});

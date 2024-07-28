import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_WIDTH_M, INPUT_WIDTH_S } from '@/constants/token';
import {
  DEFAULT_MOTION_ANIMATION_FEMALE,
  DEFAULT_MOTION_ANIMATION_MALE,
  DEFAULT_MOTION_ANIMATION_OTHER,
  MAX_TOUCH_ACTION_TEXT_LENGTH,
} from '@/constants/touch';
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
  const { t } = useTranslation(['common', 'panel', 'constants']);

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
              options={[
                {
                  label: t('touch.emotion.natural', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Neutral,
                },
                {
                  label: t('touch.emotion.happy', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Happy,
                },
                {
                  label: t('touch.emotion.angry', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Angry,
                },
                {
                  label: t('touch.emotion.sad', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Sad,
                },
                {
                  label: t('touch.emotion.relaxed', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Relaxed,
                },
                {
                  label: t('touch.emotion.surprised', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Surprised,
                },
                {
                  label: t('touch.emotion.blink', { ns: 'constants' }),
                  value: VRMExpressionPresetName.Blink,
                },
                {
                  label: t('touch.emotion.blinkLeft', { ns: 'constants' }),
                  value: VRMExpressionPresetName.BlinkLeft,
                },
                {
                  label: t('touch.emotion.blinkRight', { ns: 'constants' }),
                  value: VRMExpressionPresetName.BlinkRight,
                },
              ]}
              style={{ width: INPUT_WIDTH_S }}
              defaultActiveFirstOption={true}
            />
          </FormItem>
          <FormItem
            label={t('info.motionLabel', { ns: 'panel' })}
            desc={t('info.motionDescription', { ns: 'panel' })}
            divider
            rules={[{ required: true, message: t('touch.inputActionEmotion', { ns: 'panel' }) }]}
            name="motion"
          >
            <Select
              options={[
                ...DEFAULT_MOTION_ANIMATION_FEMALE,
                ...DEFAULT_MOTION_ANIMATION_MALE,
                ...DEFAULT_MOTION_ANIMATION_OTHER,
              ].map((item) => ({
                label: item.name,
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

export default AddOrEdit;

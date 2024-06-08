import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon, Plus } from 'lucide-react';
import React, { memo, useState } from 'react';

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
        title={isEdit ? '编辑' : '添加'}
        onClick={showModal}
      />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={800}
        destroyOnClose
        title={isEdit ? '编辑响应动作' : '添加响应动作'}
        okText={'确定'}
        cancelText={'取消'}
      >
        <Form
          layout="horizontal"
          requiredMark
          initialValues={isEdit ? touchAction : { emotion: VRMExpressionPresetName.Neutral }}
          form={form}
          preserve={false}
        >
          <FormItem
            desc={'自定义响应文案'}
            label={'文案'}
            name={'text'}
            rules={[{ required: true, message: '请输入自定义文案' }]}
          >
            <Input.TextArea
              placeholder="请输入响应文案"
              maxLength={MAX_TOUCH_ACTION_TEXT_LENGTH}
              showCount
              autoSize
              style={{ width: INPUT_WIDTH_M }}
            />
          </FormItem>
          <FormItem
            label={'表情与情绪'}
            desc={'选择响应时的情绪，会影响角色的表情变化'}
            divider
            rules={[{ required: true, message: '请输入角色响应时的表情' }]}
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

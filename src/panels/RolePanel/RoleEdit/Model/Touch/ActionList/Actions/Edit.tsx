import { ActionIcon, Form, FormItem } from '@lobehub/ui';
import { Input, Modal, Select } from 'antd';
import { Edit2Icon } from 'lucide-react';
import React, { memo, useState } from 'react';

import { INPUT_WIDTH_M, INPUT_WIDTH_S } from '@/constants/token';
import { MAX_TOUCH_ACTION_TEXT_LENGTH, TOUCH_EMOTION_OPTIONS } from '@/constants/touch';
import { useAgentStore } from '@/store/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

interface Props {
  index: number;
  touchAction: TouchAction;
  touchArea: TouchAreaEnum;
}

export default memo((props: Props) => {
  const { touchArea, index, touchAction } = props;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [updateTouchAction] = useAgentStore((s) => [s.updateTouchAction]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    const values = form.getFieldsValue();
    updateTouchAction(touchArea, index, values);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <ActionIcon icon={Edit2Icon} title={'编辑'} onClick={showModal} />
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        open={open}
        width={640}
        title="编辑响应动作"
        okText={'确定'}
        cancelText={'取消'}
      >
        <Form layout="horizontal" requiredMark={false} initialValues={touchAction} form={form}>
          <FormItem desc={'自定义响应文案'} label={'文案'} name={'text'} divider>
            <Input
              placeholder="请输入响应文案"
              maxLength={MAX_TOUCH_ACTION_TEXT_LENGTH}
              showCount
              style={{ width: INPUT_WIDTH_M }}
            />
          </FormItem>
          <FormItem
            label={'情绪'}
            desc={'选择响应时的情绪，会影响角色的表情变化'}
            divider
            name="emotion"
          >
            <Select options={TOUCH_EMOTION_OPTIONS} style={{ width: INPUT_WIDTH_S }} />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
});

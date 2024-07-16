import { VoiceList } from '@lobehub/tts';
import { Form, ItemGroup, Modal, SelectWithImg, SliderWithInput } from '@lobehub/ui';
import { Select, Switch } from 'antd';
import { useThemeMode } from 'antd-style';
import { LayoutList, MessagesSquare } from 'lucide-react';
import React, { useImperativeHandle, useState } from 'react';

import { FORM_STYLE } from '@/constants/token';
import { imageUrl } from '@/constants/url';
import { sessionSelectors, useSessionStore } from '@/store/session';

export interface ChatSettingModalActionType {
  config: () => void;
}

export interface ChatSettingModalProps {
  actionRef?: React.MutableRefObject<ChatSettingModalActionType | undefined>;
}

const ChatSettingModal = ({ actionRef }: ChatSettingModalProps) => {
  // 弹窗可见状态
  const [open, setOpen] = useState<boolean>(false);

  const [form] = Form.useForm();

  const { isDarkMode } = useThemeMode();

  const sessionConfig = sessionSelectors.currentSession(useSessionStore());

  const updateSessionConfig = useSessionStore((state) => state.updateSessionConfig);

  // 拓展 ref
  useImperativeHandle(actionRef, () => ({
    config: () => setOpen(true),
  }));

  const chat: ItemGroup = {
    children: [
      {
        children: (
          <SelectWithImg
            height={86}
            options={[
              {
                icon: MessagesSquare,
                img: imageUrl(`chatmode_chat_${isDarkMode ? 'dark' : 'light'}.webp`),
                label: '对话模式',
                value: 'chat',
              },
              {
                icon: LayoutList,
                img: imageUrl(`chatmode_docs_${isDarkMode ? 'dark' : 'light'}.webp`),
                label: '文档模式',
                value: 'docs',
              },
            ]}
            unoptimized={false}
            width={144}
          />
        ),
        label: '聊天窗口样式',
        name: ['sessionConfig', 'displayMode'],
      },
      {
        children: <Switch />,
        label: '限制历史信息数',
        minWidth: undefined,
        name: ['sessionConfig', 'enableHistoryCount'],
        valuePropName: 'checked',
      },
      {
        children: <SliderWithInput max={32} min={1} />,
        desc: '每次请求携带的消息数（包括最新编写的提问。每个提问和回答都计算1）',
        divider: false,
        hidden: !sessionConfig?.sessionConfig?.enableHistoryCount,
        label: '附带消息数',
        name: ['sessionConfig', 'historyCount'],
      },
    ],
    title: '聊天设置',
  };

  const tts: ItemGroup = {
    children: [
      {
        children: (
          <Select
            placeholder="请输入"
            defaultValue={'auto'}
            options={[{ label: '跟随系统', value: 'auto' }, ...(VoiceList.localeOptions || [])]}
          />
        ),
        label: '语音识别语种',
        desc: '语音输入的语种，此选项可提高语音识别准确率',
        name: ['tts', 'sttLocale'],
      },
    ],
    title: '语音服务',
  };

  return (
    <Modal
      destroyOnClose
      title={'偏好设置'}
      open={open}
      footer={false}
      onCancel={() => setOpen(false)}
    >
      <Form
        form={form}
        items={[chat, tts]}
        onValuesChange={(_, values) => updateSessionConfig(values)}
        itemsType={'group'}
        variant="pure"
        {...FORM_STYLE}
        itemMinWidth={'max(30%,304px)'}
        initialValues={sessionConfig}
      />
    </Modal>
  );
};

export default ChatSettingModal;

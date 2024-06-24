'use client';

import { Form, ItemGroup, SelectWithImg } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { LayoutList, MessagesSquare } from 'lucide-react';
import { memo } from 'react';

import { FORM_STYLE } from '@/constants/token';
import { imageUrl } from '@/constants/url';

const ChatSetting = memo(() => {
  const { isDarkMode } = useThemeMode();

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
        name: 'displayMode',
        minWidth: undefined,
      },
    ],
    title: '对话设置',
  };

  return <Form items={[chat]} itemsType={'group'} variant={'pure'} {...FORM_STYLE} />;
});

export default ChatSetting;

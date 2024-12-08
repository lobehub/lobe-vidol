import { VRMExpressionPresetName } from '@pixiv/three-vrm-core';

import { MotionPresetName } from '@/libs/emoteController/motionPresetMap';
import { ChatStreamPayload } from '@/types/provider/chat';

export const chainJudgeMotion = (content: string): Partial<ChatStreamPayload> => ({
  messages: [
    {
      content: `
        ### 任务说明 
        你是一名情感分析助理。请根据提供的输入内容，判断角色应表现出的情感，包括表情和动作。

        ### 表情选项
        ${Object.values(VRMExpressionPresetName).join(', ')}

        ### 动作选项
        ${Object.values(MotionPresetName).join(', ')}

        ### 输出格式

        请以json格式输出，输出格式如下：
        {
          "expression": "表情",
          "motion": "动作"
        }
        `,
      role: 'system',
    },
    {
      content: `请将以下内容 ${content}，判断角色应该做出什么表情和动作`,
      role: 'user',
    },
  ],
});

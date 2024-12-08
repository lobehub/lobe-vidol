import { VRMExpressionPresetName } from '@pixiv/three-vrm-core';

import { MotionPresetName } from '@/libs/emoteController/motionPresetMap';
import { ChatStreamPayload } from '@/types/provider/chat';

export const chainEmotionAnalysis = (content: string): Partial<ChatStreamPayload> => ({
  messages: [
    {
      content: `
        ### 任务说明
        你是一名情感分析助理。请分析以下内容的情感倾向,并给出相应的表情和动作建议。

        ### 分析要求
        1. 仔细分析文本中表达的情感色彩和语气
        2. 根据情感选择最合适的表情
        3. 选择与情感相匹配的动作表现

        ### 表情选项
        ${Object.values(VRMExpressionPresetName).join(', ')}

        ### 动作选项  
        ${Object.values(MotionPresetName).join(', ')}

        ### 输出格式
        请以JSON格式输出:
        {
          "expression": "表情名称",
          "motion": "动作名称",
          "reason": "选择原因说明"
        }
        `,
      role: 'system',
    },
    {
      content: `请对以下内容进行情感分析: ${content}`,
      role: 'user',
    },
  ],
});

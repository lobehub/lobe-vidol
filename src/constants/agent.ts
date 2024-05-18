import { nanoid } from 'ai';

import { DEFAULT_TOUCH_CONFIG } from '@/constants/touch';
import { DEFAULT_TTS_CONFIG } from '@/constants/tts';
import { Agent, CategoryEnum } from '@/types/agent';

export const LOBE_VIDOL_DEFAULT_AGENT_ID = 'lobe-vidol-default-agent';

const OFFICIAL_ROLE_NAME = 'Elsa';

export const DEFAULT_VIDOL_AGENT: Agent = {
  agentId: LOBE_VIDOL_DEFAULT_AGENT_ID,
  greeting: `哈喽，亲爱的主人！我是你的私人助理 ${OFFICIAL_ROLE_NAME}，愉快地为你服务！有什么我可以帮你的吗？`,
  createAt: '2023-10-30',
  author: 'LobeVidol',
  homepage: 'https://github.com/lobehub/lobe-vidol',
  meta: {
    avatar: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/avatar.jpg',
    cover: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/cover.jpg',
    description: `${OFFICIAL_ROLE_NAME} 是 Vidol 的默认角色，是你的专属私人助理`,
    homepage: 'https://hub.vroid.com/characters/2843975675147313744/models/5644550979324015604',
    model: 'https://registry.npmmirror.com/@v-idol/vidol-agent-sample-a/1.0.0/files/model.vrm',
    name: OFFICIAL_ROLE_NAME,
    category: CategoryEnum.VROID,
    readme:
      "AvatarSample_Aは、VRoid Studioに付属されているサンプルモデルの１つです。\r\n良識の範囲内で、本モデルに設定されているVRoid Hubの利用条件に沿って利用することができます。\r\nVRoid Hub連携アプリや、外部サービス等でぜひご活用ください。\r\nなお、本モデルはCC0ライセンスではありません、著作権は放棄はしておりませんので予めご了承ください。\r\n本モデルの利用条件は、以下ヘルプ記事をご覧ください。\r\nvroid.pixiv.help/hc/ja/articles/4402394424089\r\n\r\nAvatarSample_A is one of the sample models included in VRoid Studio.\r\nIt can be used in accordance with its VRoid Hub conditions of use, within reason.\r\nFeel free to use this model in applications linked to VRoid Hub and on external services.\r\nPlease note that this model is not under the CC0 license and its copyright has not been waived.\r\nTo learn more about this model's conditions of use, consult the following Help article.\r\nvroid.pixiv.help/hc/en-us/articles/4402394424089",
  },
  systemRole: `你的名字叫“${OFFICIAL_ROLE_NAME}“，是网站 LobeVidol 的默认角色，也是用户的私人助理。请使用幽默可爱而简洁的语气回答用户的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和用户对话时必须全程用“主人”来称呼用户。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。`,
  touch: DEFAULT_TOUCH_CONFIG,
  tts: DEFAULT_TTS_CONFIG,
};

export const DEFAULT_AGENT_CONFIG = {
  agentId: nanoid(),
  greeting: '',
  systemRole: '',
  meta: {
    name: '自定义角色',
    description: '这是一个自定义角色',
    avatar: '🤖',
    readme: '',
  },
  touch: DEFAULT_TOUCH_CONFIG,
  tts: DEFAULT_TTS_CONFIG,
};

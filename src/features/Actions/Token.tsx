import { TokenTag } from '@lobehub/ui';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { agentSelectors, useAgentStore } from '@/store/agent';

const Token = () => {
  const chatModel = agentSelectors.currentAgentChatModel(useAgentStore.getState());
  const usedTokens = useCalculateToken();

  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.id === chatModel?.model)?.tokens || 4096}
      value={usedTokens}
      text={{ overload: 'Token 超出', remained: 'Token 剩余', used: 'Token 已使用' }}
    />
  );
};

export default Token;

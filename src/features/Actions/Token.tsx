import { TokenTag } from '@lobehub/ui';
import { isEqual } from 'lodash-es';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useSettingStore } from '@/store/setting';

const Token = () => {
  const config = useSettingStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const usedTokens = useCalculateToken();

  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.name === config?.model)?.maxToken || 4096}
      value={usedTokens}
      text={{ overload: 'Token 超出', remained: 'Token 剩余', used: 'Token 已使用' }}
    />
  );
};

export default Token;

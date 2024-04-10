import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useConfigStore } from '@/store/config';
import { TokenTag } from '@lobehub/ui';
import { isEqual } from 'lodash-es';

const Token = () => {
  const config = useConfigStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const usedTokens = useCalculateToken();

  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.name === config?.model)?.maxToken || 4096}
      value={usedTokens}
    />
  );
};

export default Token;

import { TokenTag } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useSettingStore } from '@/store/setting';

const Token = () => {
  const config = useSettingStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const usedTokens = useCalculateToken();
  const { t } = useTranslation('features');
  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.id === config?.model)?.tokens || 4096}
      value={usedTokens}
      text={{ overload: t('token.overload'), remained: t('token.remained'), used: t('token.used') }}
    />
  );
};

export default Token;

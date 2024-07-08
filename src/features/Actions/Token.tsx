import { TokenTag } from '@lobehub/ui';
import { useTranslation } from 'react-i18next';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import useSessionContext from '@/hooks/useSessionContext';

const Token = () => {
  const model = useSessionContext()?.sessionAgent?.model;
  const usedTokens = useCalculateToken();
  const { t } = useTranslation('features');
  return (
    <TokenTag
      maxValue={OPENAI_MODEL_LIST.find((item) => item.id === model)?.tokens || 4096}
      value={usedTokens}
      text={{ overload: t('token.overload'), remained: t('token.remained'), used: t('token.used') }}
    />
  );
};

export default Token;

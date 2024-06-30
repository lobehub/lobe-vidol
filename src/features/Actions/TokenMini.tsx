import { Tooltip, Typography } from 'antd';
import { isEqual } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useSettingStore } from '@/store/setting';

const TokenMini = () => {
  const config = useSettingStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const usedTokens = useCalculateToken();
  const maxValue = OPENAI_MODEL_LIST.find((item) => item.id === config?.model)?.tokens || 4096;
  const { t } = useTranslation('features');

  return (
    <Tooltip title={t('token.useToken', { usedTokens, maxValue })}>
      <Typography.Text type={'secondary'}>
        {t('token.tokenCount')}: {usedTokens}
      </Typography.Text>
    </Tooltip>
  );
};
export default TokenMini;

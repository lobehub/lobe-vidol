import { Tooltip, Typography } from 'antd';
import { isEqual } from 'lodash-es';

import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { configSelectors, useSettingStore } from '@/store/setting';

const TokenMini = () => {
  const config = useSettingStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const usedTokens = useCalculateToken();
  const maxValue = OPENAI_MODEL_LIST.find((item) => item.id === config?.model)?.tokens || 4096;

  return (
    <Tooltip title={`消耗 Token 数量计算，包括消息，角色设定与上下文：${usedTokens} / ${maxValue}`}>
      <Typography.Text type={'secondary'}>Token Count: {usedTokens}</Typography.Text>
    </Tooltip>
  );
};

export default TokenMini;

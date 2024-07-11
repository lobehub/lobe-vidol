import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { CategoryEnum } from '@/types/agent';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default memo<Props>((props) => {
  const { style, className } = props;
  const [meta, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s),
    s.updateAgentMeta,
  ]);

  const { t } = useTranslation('role');

  return (
    <Select
      className={className}
      style={style}
      options={[
        { label: t('category.animal'), value: CategoryEnum.ANIMAL },
        { label: t('agent.anime'), value: CategoryEnum.ANIME },
        { label: t('agent.book'), value: CategoryEnum.BOOK },
        { label: t('agent.game'), value: CategoryEnum.GAME },
        { label: t('agent.history'), value: CategoryEnum.HISTORY },
        { label: t('agent.movie'), value: CategoryEnum.MOVIE },
        { label: t('agent.realistic'), value: CategoryEnum.REALISTIC },
        { label: t('agent.vroid'), value: CategoryEnum.VROID },
        { label: t('agent.vtuber'), value: CategoryEnum.VTUBER },
      ]}
      value={meta?.category}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ category: value });
      }}
    />
  );
});

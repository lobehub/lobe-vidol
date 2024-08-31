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
  const [category, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s)?.category,
    s.updateAgentMeta,
  ]);

  const { t } = useTranslation('role');

  return (
    <Select
      className={className}
      style={style}
      options={[
        { label: t('category.animal'), value: CategoryEnum.ANIMAL },
        { label: t('category.anime'), value: CategoryEnum.ANIME },
        { label: t('category.book'), value: CategoryEnum.BOOK },
        { label: t('category.game'), value: CategoryEnum.GAME },
        { label: t('category.history'), value: CategoryEnum.HISTORY },
        { label: t('category.movie'), value: CategoryEnum.MOVIE },
        { label: t('category.realistic'), value: CategoryEnum.REALISTIC },
        { label: t('category.vroid'), value: CategoryEnum.VROID },
        { label: t('category.vtuber'), value: CategoryEnum.VTUBER },
      ]}
      value={category}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ category: value });
      }}
    />
  );
});

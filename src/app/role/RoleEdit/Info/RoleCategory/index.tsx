import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { RoleCategoryEnum } from '@/types/agent';

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
        { label: t('category.animal'), value: RoleCategoryEnum.ANIMAL },
        { label: t('category.anime'), value: RoleCategoryEnum.ANIME },
        { label: t('category.book'), value: RoleCategoryEnum.BOOK },
        { label: t('category.game'), value: RoleCategoryEnum.GAME },
        { label: t('category.history'), value: RoleCategoryEnum.HISTORY },
        { label: t('category.movie'), value: RoleCategoryEnum.MOVIE },
        { label: t('category.realistic'), value: RoleCategoryEnum.REALISTIC },
        { label: t('category.vroid'), value: RoleCategoryEnum.VROID },
        { label: t('category.vtuber'), value: RoleCategoryEnum.VTUBER },
      ]}
      value={category}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ category: value });
      }}
    />
  );
});

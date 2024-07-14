import { Select } from 'antd';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { agentSelectors, useAgentStore } from '@/store/agent';
import { GenderEnum } from '@/types/agent';

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

  const { t } = useTranslation('constants');

  return (
    <Select
      className={className}
      style={style}
      options={[
        { label: t('agent.gender.male'), value: GenderEnum.MALE },
        { label: t('agent.gender.female'), value: GenderEnum.FEMALE },
        { label: t('agent.gender.other'), value: GenderEnum.OTHER },
      ]}
      value={meta?.gender}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ gender: value });
      }}
    />
  );
});

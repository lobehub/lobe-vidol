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
  const [gender, updateAgentMeta] = useAgentStore((s) => [
    agentSelectors.currentAgentMeta(s)?.gender,
    s.updateAgentMeta,
  ]);

  const { t } = useTranslation('role');

  return (
    <Select
      className={className}
      style={style}
      options={[
        { label: t('gender.male'), value: GenderEnum.MALE },
        { label: t('gender.female'), value: GenderEnum.FEMALE },
      ]}
      value={gender}
      defaultActiveFirstOption={true}
      onChange={(value) => {
        updateAgentMeta({ gender: value });
      }}
    />
  );
});

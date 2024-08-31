import { Select } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import { ModelItemRender } from '@/components/ModelSelect';
import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { agentSelectors, useAgentStore } from '@/store/agent';

const useStyles = createStyles(({ css, prefixCls }) => ({
  select: css`
    &.${prefixCls}-select-dropdown .${prefixCls}-select-item-option-grouped {
      padding-inline-start: 12px;
    }
  `,
}));

const ModelSelect = memo(() => {
  const { styles } = useStyles();
  const [model, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentItem(s)?.model,
    s.updateAgentConfig,
  ]);

  return (
    <Select
      options={OPENAI_MODEL_LIST.map((model) => ({
        label: <ModelItemRender {...model} />,
        value: model.id,
      }))}
      popupClassName={styles.select}
      value={model}
      onChange={(value) => updateAgentConfig({ model: value })}
      placeholder="请选择"
    />
  );
});

export default ModelSelect;

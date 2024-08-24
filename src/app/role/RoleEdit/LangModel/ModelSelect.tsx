import { Select } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';

import { ModelItemRender } from '@/components/ModelSelect';
import { OPENAI_MODEL_LIST } from '@/constants/openai';

const useStyles = createStyles(({ css, prefixCls }) => ({
  select: css`
    &.${prefixCls}-select-dropdown .${prefixCls}-select-item-option-grouped {
      padding-inline-start: 12px;
    }
  `,
}));

interface ModelSelectProps {
  onChange?: (modelId: string) => void;
  value?: string;
}

const ModelSelect = memo<ModelSelectProps>(({ value, onChange }) => {
  const { styles } = useStyles();

  return (
    <Select
      options={OPENAI_MODEL_LIST.map((model) => ({
        label: <ModelItemRender {...model} />,
        value: model.id,
      }))}
      popupClassName={styles.select}
      value={value}
      onChange={onChange}
      placeholder="请选择"
    />
  );
});

export default ModelSelect;

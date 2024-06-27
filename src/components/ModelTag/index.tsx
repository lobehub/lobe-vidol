import { Tag } from '@lobehub/ui';
import { memo } from 'react';

import { OPENAI_MODEL_LIST } from '@/constants/openai';

import ModelIcon from './ModelIcon';

interface ModelTagProps {
  model?: string;
}
const ModelTag = memo<ModelTagProps>(({ model }) => {
  const selectedModel = OPENAI_MODEL_LIST.find(({ id }) => id === model);

  return (
    <Tag icon={<ModelIcon model={model} />}>
      {selectedModel ? selectedModel?.displayName : '请选择模型'}
    </Tag>
  );
});

export default ModelTag;

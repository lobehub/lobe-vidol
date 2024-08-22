import { Tag } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { OPENAI_MODEL_LIST } from '@/constants/openai';

import ModelIcon from './ModelIcon';

interface ModelTagProps {
  model?: string;
}
const ModelTag = memo<ModelTagProps>(({ model }) => {
  const { t } = useTranslation('chat');
  const selectedModel = OPENAI_MODEL_LIST.find(({ id }) => id === model);

  return (
    <Tag icon={<ModelIcon model={model} />}>
      {selectedModel ? selectedModel?.displayName : t('selectModel')}
    </Tag>
  );
});

export default ModelTag;

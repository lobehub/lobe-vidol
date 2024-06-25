import { Tag } from '@lobehub/ui';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ModelIcon from './ModelIcon';

interface ModelTagProps {
  model?: string;
}
const ModelTag = memo<ModelTagProps>(({ model }) => {
  const { t } = useTranslation('common');
  return <Tag icon={<ModelIcon model={model} />}>{model ? model : t('selectModel')}</Tag>;
});

export default ModelTag;

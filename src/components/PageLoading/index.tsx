import { Icon, Logo } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import React, { memo } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

interface PageLoadingProps {
  className?: string;
  description?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
}

const PageLoading = (props: PageLoadingProps) => {
  const { title, className, style, description } = props;
  return (
    <Flexbox height={'100%'} width={'100%'} className={className} style={style}>
      <Center flex={1} gap={12} width={'100%'}>
        <Logo extra={'Vidol'} size={48} type={'combine'} />
        <Center gap={16} horizontal>
          <Icon icon={Loader2} spin />
          {title}
        </Center>
        {description && <Center>{description}</Center>}
      </Center>
    </Flexbox>
  );
};

export default memo(PageLoading);

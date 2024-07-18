import { Empty } from 'antd';
import React, { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/app/settings/Settings/animations/ActionList/ListItem';
import Header from '@/components/Header';
import { ANIMATION_CONFIG } from '@/constants/touch';
import { GenderEnum } from '@/types/agent';

interface AreaListProps {
  className?: string;
  currentGender: GenderEnum;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum }[];
  style?: React.CSSProperties;
}

const AreaList = memo((props: AreaListProps) => {
  const { currentGender, style, className, genderOptions = [] } = props;
  const { t } = useTranslation(['panel', 'features']);
  const items = ANIMATION_CONFIG[currentGender] || [];
  const gender = genderOptions.find((item) => item.value === currentGender)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header title={t('animation.animationList', { gender })} />
      {items.map((item, index) => {
        return <ListItem item={item} currentGender={currentGender} index={index} key={index} />;
      })}
      {items.length === 0 && (
        <Empty
          description={t('animation.noAnimations', { ns: 'panel' })}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Flexbox>
  );
});

export default AreaList;

import React, { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/app/settings/Settings/animations/ActionList/ListItem';
import Header from '@/components/Header';
import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
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
  const gender = genderOptions.find((item) => item.value === currentGender)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header title={t('animation.animationList', { gender })} />
      {DEFAULT_MOTION_ANIMATION.map((item, index) => {
        return <ListItem item={item} currentGender={currentGender} index={index} key={index} />;
      })}
    </Flexbox>
  );
});

export default AreaList;

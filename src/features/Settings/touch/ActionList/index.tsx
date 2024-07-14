import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import FemaleList from '@/features/Settings/touch/ActionList/List/FemaleList';
import MaleList from '@/features/Settings/touch/ActionList/List/MaleList';
import { TouchAreaEnum } from '@/types/touch';

import Header from '../components/Header';

interface AreaListProps {
  areaOptions?: { label: string; value: TouchAreaEnum }[];
  className?: string;
  currentTouchArea: TouchAreaEnum;
  style?: React.CSSProperties;
}

const AreaList = memo((props: AreaListProps) => {
  const { currentTouchArea, style, className, areaOptions = [] } = props;
  const { t } = useTranslation(['panel', 'features']);

  const touchArea = areaOptions.find((item) => item.value === currentTouchArea)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header title={t('touch.touchActionList', { touchArea })} />
      <FemaleList currentTouchArea={currentTouchArea} />
      <MaleList currentTouchArea={currentTouchArea} />
    </Flexbox>
  );
});

export default AreaList;

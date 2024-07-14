import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import { TouchAreaEnum } from '@/types/touch';

import FemaleList from './List/FemaleList';
import MaleList from './List/MaleList';
import OtherList from './List/OtherList';

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
      <OtherList currentTouchArea={currentTouchArea} />
    </Flexbox>
  );
});

export default AreaList;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { configSelectors, useSettingStore } from '@/store/setting';
import { TouchAreaEnum } from '@/types/touch';

import Header from '../components/Header';
import AddOrEdit from './Actions/AddOrEdit';
import ListItem from './ListItem';

interface AreaListProps {
  areaOptions?: { label: string; value: TouchAreaEnum }[];
  className?: string;
  currentTouchArea: TouchAreaEnum;
  style?: React.CSSProperties;
}

const AreaList = (props: AreaListProps) => {
  const { currentTouchArea, style, className, areaOptions = [] } = props;
  const [female, male, other] = useSettingStore((s) => [
    configSelectors.currentFemaleTouchConfig(s, currentTouchArea),
    configSelectors.currentMaleTouchConfig(s, currentTouchArea),
    configSelectors.currentOtherTouchConfig(s, currentTouchArea),
  ]);
  const { t } = useTranslation(['panel', 'features']);

  const touchArea = areaOptions.find((item) => item.value === currentTouchArea)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header title={t('touch.touchActionList', { touchArea })} />
      <Header
        title={t('agent.female', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} />}
      />
      {female.map((item, index) => {
        return (
          <ListItem item={item} currentTouchArea={currentTouchArea} index={index} key={index} />
        );
      })}
      <Header
        title={t('agent.male', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} />}
      />
      {male.map((item, index) => {
        return (
          <ListItem item={item} currentTouchArea={currentTouchArea} index={index} key={index} />
        );
      })}

      <Header
        title={t('agent.other', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} />}
      />
      {other.map((item, index) => {
        return (
          <ListItem item={item} currentTouchArea={currentTouchArea} index={index} key={index} />
        );
      })}
    </Flexbox>
  );
};

export default AreaList;

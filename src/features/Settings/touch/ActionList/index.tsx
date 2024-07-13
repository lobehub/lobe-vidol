import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { configSelectors, useSettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
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
    configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.FEMALE, currentTouchArea),
    configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.MALE, currentTouchArea),
    configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.OTHER, currentTouchArea),
  ]);
  const { t } = useTranslation(['panel', 'features']);

  const touchArea = areaOptions.find((item) => item.value === currentTouchArea)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header title={t('touch.touchActionList', { touchArea })} />
      <Header
        title={t('agent.female', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.FEMALE} />}
      />
      {female.map((item, index) => {
        return (
          <ListItem
            item={item}
            currentTouchArea={currentTouchArea}
            index={index}
            key={index}
            gender={GenderEnum.FEMALE}
          />
        );
      })}
      <Header
        title={t('agent.male', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.MALE} />}
      />
      {male.map((item, index) => {
        return (
          <ListItem
            item={item}
            currentTouchArea={currentTouchArea}
            index={index}
            key={index}
            gender={GenderEnum.MALE}
          />
        );
      })}

      <Header
        title={t('agent.other', { ns: 'features' })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.OTHER} />}
      />
      {other.map((item, index) => {
        return (
          <ListItem
            item={item}
            currentTouchArea={currentTouchArea}
            index={index}
            key={index}
            gender={GenderEnum.OTHER}
          />
        );
      })}
    </Flexbox>
  );
};

export default AreaList;

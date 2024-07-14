import { isEqual } from 'lodash-es';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { configSelectors, useSettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { TouchAreaEnum } from '@/types/touch';

import Header from '../../components/Header';
import AddOrEdit from '../Actions/AddOrEdit';
import ListItem from '../ListItem';

interface AreaListProps {
  currentTouchArea: TouchAreaEnum;
}

const AreaList = memo((props: AreaListProps) => {
  const { currentTouchArea } = props;
  const touchList = useSettingStore(
    (s) => configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.MALE, currentTouchArea),
    isEqual,
  );
  const { t } = useTranslation('features');

  return (
    <>
      <Header
        title={t('agent.male')}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.MALE} />}
      />
      {touchList.map((item, index) => {
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
    </>
  );
});

export default AreaList;

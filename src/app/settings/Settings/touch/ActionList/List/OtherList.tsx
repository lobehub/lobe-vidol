import { isEqual } from 'lodash-es';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import { configSelectors, useSettingStore } from '@/store/setting';
import { GenderEnum } from '@/types/agent';
import { TouchAreaEnum } from '@/types/touch';

import AddOrEdit from '../Actions/AddOrEdit';
import ListItem from '../ListItem';

interface AreaListProps {
  currentTouchArea: TouchAreaEnum;
}

const AreaList = memo((props: AreaListProps) => {
  const { currentTouchArea } = props;
  const touchList = useSettingStore(
    (s) => configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.OTHER, currentTouchArea),
    isEqual,
  );
  const { t } = useTranslation('features');

  return (
    <>
      <Header
        title={t('agent.other')}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.OTHER} />}
      />
      {touchList.map((item, index) => {
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
    </>
  );
});

export default AreaList;

import { Empty } from 'antd';
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
  const items = useSettingStore(
    (s) => configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.FEMALE, currentTouchArea),
    isEqual,
  );
  const { t } = useTranslation('role');

  return (
    <>
      <Header
        title={t('agent.female')}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.FEMALE} />}
      />
      {items.map((item, index) => {
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
      {items.length === 0 && (
        <Empty
          description={t('touch.noTouchActions', { ns: 'role' })}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
});

export default AreaList;

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
    (s) => configSelectors.getTouchActionsByGenderAndArea(s, GenderEnum.OTHER, currentTouchArea),
    isEqual,
  );
  const { t } = useTranslation(['features', 'panel']);

  return (
    <>
      <Header
        title={t('agent.other')}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} gender={GenderEnum.OTHER} />}
      />
      {items.map((item, index) => {
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
      {items.length === 0 && (
        <Empty
          description={t('touch.noTouchActions', { ns: 'panel' })}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </>
  );
});

export default AreaList;

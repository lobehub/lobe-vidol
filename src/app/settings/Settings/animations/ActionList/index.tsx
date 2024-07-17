import { Empty } from 'antd';
import { isEqual } from 'lodash-es';
import React, { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/app/settings/Settings/animations/ActionList/ListItem';
import Header from '@/components/Header';
import { configSelectors, useSettingStore } from '@/store/setting';
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
  const items = useSettingStore(
    (s) => configSelectors.getAnimationsByGender(s, currentGender),
    isEqual,
  );
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

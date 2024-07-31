import { createStyles } from 'antd-style';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/app/settings/Settings/animations/ActionList/ListItem';
import Header from '@/components/Header';
import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { GenderEnum } from '@/types/agent';
import { MotionAnimation, MotionCategoryEnum } from '@/types/touch';

interface AreaListProps {
  className?: string;
  currentCategory?: MotionCategoryEnum;
  currentGender?: GenderEnum;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  list: css`
    overflow-y: scroll;
    width: 100%;
    height: 640px;
  `,
}));

const AreaList = memo((props: AreaListProps) => {
  const { currentGender, currentCategory, style, className } = props;
  const { t } = useTranslation(['panel', 'features']);
  const { styles } = useStyles();

  const genderFilter = (item: MotionAnimation) =>
    currentGender ? item.gender === currentGender : true;
  const categoryFilter = (item: MotionAnimation) =>
    currentCategory ? currentCategory === item.category : true;

  const filteredList = DEFAULT_MOTION_ANIMATION.filter(
    (item) => genderFilter(item) && categoryFilter(item),
  );

  console.log('filteredList', filteredList);

  return (
    <Flexbox style={style} className={className} flex={1}>
      <Header
        title={t('animation.animationList')}
        extra={t('animation.totalCount', { total: filteredList.length })}
      />
      <Flexbox className={styles.list}>
        {filteredList.map((item) => {
          return <ListItem item={item} key={item.id} />;
        })}
      </Flexbox>
    </Flexbox>
  );
});

export default AreaList;

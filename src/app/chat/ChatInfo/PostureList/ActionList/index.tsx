import { createStyles } from 'antd-style';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import { Virtuoso } from 'react-virtuoso';

import Header from '@/components/Header';
import { DEFAULT_POSTURE_ANIMATION } from '@/constants/touch';
import { GenderEnum } from '@/types/agent';
import { MotionAnimation, PostureCategoryEnum } from '@/types/touch';

import ListItem from './ListItem';

interface AreaListProps {
  className?: string;
  currentCategory?: PostureCategoryEnum;
  currentGender?: GenderEnum;
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  list: css`
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  `,
}));

const AreaList = memo((props: AreaListProps) => {
  const { currentGender, currentCategory, style, className } = props;
  const { t } = useTranslation('chat');
  const { styles } = useStyles();

  const genderFilter = (item: MotionAnimation) =>
    currentGender ? item.gender === currentGender : true;
  const categoryFilter = (item: MotionAnimation) =>
    currentCategory ? currentCategory === item.category : true;

  const filteredList = useMemo(
    () => DEFAULT_POSTURE_ANIMATION.filter((item) => genderFilter(item) && categoryFilter(item)),
    [currentGender, currentCategory],
  );

  return (
    <Flexbox style={style} className={className} flex={1} height={'100%'}>
      <Header
        title={t('animation.postureList')}
        extra={t('animation.totalCount', { total: filteredList.length })}
      />
      <Flexbox className={styles.list}>
        <Virtuoso
          computeItemKey={(_, item) => item.id}
          data={filteredList}
          followOutput={false}
          itemContent={(index, item) => <ListItem item={item} key={item.id} />}
        />
      </Flexbox>
    </Flexbox>
  );
});

export default AreaList;

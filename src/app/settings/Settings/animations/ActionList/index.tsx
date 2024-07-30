import { createStyles } from 'antd-style';
import React, { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/app/settings/Settings/animations/ActionList/ListItem';
import Header from '@/components/Header';
import { DEFAULT_MOTION_ANIMATION } from '@/constants/touch';
import { GenderEnum } from '@/types/agent';

interface AreaListProps {
  className?: string;
  currentGender?: GenderEnum;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum | undefined }[];
  style?: React.CSSProperties;
}

const useStyles = createStyles(({ css }) => ({
  list: css`
    overflow-y: scroll;
    width: 100%;
    height: 800px;
  `,
}));

const AreaList = memo((props: AreaListProps) => {
  const { currentGender, style, className, genderOptions = [] } = props;
  const { t } = useTranslation(['panel', 'features']);
  const gender = genderOptions.find((item) => item.value === currentGender)?.label;
  const { styles } = useStyles();

  return (
    <Flexbox style={style} className={className} flex={1}>
      <Header title={t('animation.animationList', { gender })} />
      <Flexbox className={styles.list}>
        {DEFAULT_MOTION_ANIMATION.filter((item) =>
          currentGender ? item.gender === currentGender : true,
        ).map((item) => {
          return <ListItem item={item} key={item.id} />;
        })}
      </Flexbox>
    </Flexbox>
  );
});

export default AreaList;

import { Divider } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import { GenderEnum } from '@/types/agent';
import { MotionCategoryEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  item: css`
    position: relative;
    width: 100px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  categoryOptions: { icon: ReactNode; label: string; value: MotionCategoryEnum | undefined }[];
  currentCategory?: MotionCategoryEnum;
  currentGender?: GenderEnum;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum | undefined }[];
  setCurrentCategory: (category?: MotionCategoryEnum) => void;
  setCurrentGender: (gender?: GenderEnum) => void;
}

const Index = (props: IndexProps) => {
  const { styles } = useStyles();
  const {
    currentGender,
    currentCategory,
    setCurrentGender,
    setCurrentCategory,
    genderOptions = [],
    categoryOptions = [],
  } = props;
  const { t } = useTranslation('role');

  return (
    <Flexbox>
      <Header title={t('info.genderLabel')} />
      {genderOptions.map((item) => (
        <ListItem
          avatar={item.icon}
          className={classNames(styles.item)}
          active={item.value === currentGender}
          key={`gender-${item.value}`}
          title={item.label}
          onClick={() => setCurrentGender(item.value)}
        />
      ))}
      <Divider />
      <Header title={t('info.motionCategoryLabel')} />
      {categoryOptions.map((item) => (
        <ListItem
          avatar={item.icon}
          className={classNames(styles.item)}
          active={item.value === currentCategory}
          key={`category-${item.value}`}
          title={item.label}
          onClick={() => setCurrentCategory(item.value)}
        />
      ))}
    </Flexbox>
  );
};

export default Index;

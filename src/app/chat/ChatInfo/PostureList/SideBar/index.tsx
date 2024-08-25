import { Divider } from 'antd';
import { ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import CategoryFilter from '@/app/chat/ChatInfo/PostureList/SideBar/filters/CategoryFilter';
import GenderFilter from '@/app/chat/ChatInfo/PostureList/SideBar/filters/GenderFilter';
import Header from '@/components/Header';
import { GenderEnum } from '@/types/agent';
import { PostureCategoryEnum } from '@/types/touch';

interface IndexProps {
  categoryOptions: { icon: ReactNode; label: string; value: PostureCategoryEnum | undefined }[];
  currentCategory: PostureCategoryEnum | undefined;
  currentGender: GenderEnum | undefined;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum | undefined }[];
  setCurrentCategory: (category?: PostureCategoryEnum) => void;
  setCurrentGender: (gender?: GenderEnum) => void;
}

const Index = memo((props: IndexProps) => {
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
      <GenderFilter
        genderOptions={genderOptions}
        setCurrentGender={setCurrentGender}
        currentGender={currentGender}
      />

      <Divider />
      <Header title={t('info.postureCategoryLabel')} />
      <CategoryFilter
        categoryOptions={categoryOptions}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </Flexbox>
  );
});

export default Index;

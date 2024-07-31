import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { GalleryVerticalEnd } from 'lucide-react';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { GenderEnum } from '@/types/agent';
import { MotionCategoryEnum } from '@/types/touch';

import ActionList from './ActionList';
import SideBar from './SideBar';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    height: 100%;
    padding: 0 16px;
    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
}));

interface MotionListProps {
  className?: string;
  style?: React.CSSProperties;
}

const MotionList = (props: MotionListProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [currentGender, setCurrentGender] = useState<GenderEnum | undefined>(undefined);
  const [currentCategory, setCurrentCategory] = useState<MotionCategoryEnum | undefined>(undefined);

  const { t } = useTranslation(['constants']);

  const GENDER_OPTIONS = [
    {
      label: t('agent.gender.all'),
      value: undefined,
      icon: <GalleryVerticalEnd style={{ fontSize: 24 }} />,
    },
    {
      label: t('agent.gender.female'),
      value: GenderEnum.FEMALE,
      icon: <WomanOutlined style={{ fontSize: 24 }} />,
    },
    {
      label: t('agent.gender.male'),
      value: GenderEnum.MALE,
      icon: <ManOutlined style={{ fontSize: 24 }} />,
    },
  ];

  const CATEGORY_OPTIONS = [
    {
      label: t('touch.motion.all'),
      value: undefined,
      icon: <GalleryVerticalEnd style={{ fontSize: 24 }} />,
    },
    {
      label: t('touch.motion.normal'),
      value: MotionCategoryEnum.NORMAL,
      icon: <ManOutlined style={{ fontSize: 24 }} />,
    },
    {
      label: t('touch.motion.dance'),
      value: MotionCategoryEnum.DANCE,
      icon: <WomanOutlined style={{ fontSize: 24 }} />,
    },
  ];

  return (
    <Flexbox horizontal className={classNames(className, styles.container)} style={style}>
      <SideBar
        currentGender={currentGender}
        setCurrentGender={setCurrentGender}
        genderOptions={GENDER_OPTIONS}
        categoryOptions={CATEGORY_OPTIONS}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <ActionList
        currentGender={currentGender}
        currentCategory={currentCategory}
        style={{ marginLeft: 12 }}
      />
    </Flexbox>
  );
};

export default memo(MotionList);

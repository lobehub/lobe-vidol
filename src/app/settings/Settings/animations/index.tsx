import { ManOutlined, QuestionCircleOutlined, WomanOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GenderEnum } from '@/types/agent';

import ActionList from './ActionList';
import SideBar from './SideBar';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;

    display: flex;

    width: 100%;
    min-height: 480px;
    padding: 0 16px;

    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;
  `,
}));

interface TouchProps {
  className?: string;
  style?: React.CSSProperties;
}

const Touch = (props: TouchProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [currentGender, setCurrentGender] = useState<GenderEnum>(GenderEnum.FEMALE);

  const { t } = useTranslation(['constants']);

  const GENDER_OPTIONS = [
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
    {
      label: t('agent.gender.other'),
      value: GenderEnum.OTHER,
      icon: <QuestionCircleOutlined style={{ fontSize: 24 }} />,
    },
  ];

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <SideBar
        currentGender={currentGender}
        setCurrentGender={setCurrentGender}
        genderOptions={GENDER_OPTIONS}
      />
      <ActionList
        currentGender={currentGender}
        style={{ marginLeft: 12 }}
        genderOptions={GENDER_OPTIONS}
      />
    </div>
  );
};

export default memo(Touch);

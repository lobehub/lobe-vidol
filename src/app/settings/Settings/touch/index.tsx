import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TouchAreaEnum } from '@/types/touch';

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
  const [currentTouchArea, setCurrentTouchArea] = useState<TouchAreaEnum>(TouchAreaEnum.Head);

  const { t } = useTranslation('role');

  const TOUCH_AREA_OPTIONS = [
    {
      label: t('touch.area.head', { ns: 'role' }),
      value: TouchAreaEnum.Head,
    },
    {
      label: t('touch.area.arm', { ns: 'role' }),
      value: TouchAreaEnum.Arm,
    },
    {
      label: t('touch.area.leg', { ns: 'role' }),
      value: TouchAreaEnum.Leg,
    },
    {
      label: t('touch.area.chest', { ns: 'role' }),
      value: TouchAreaEnum.Chest,
    },
    {
      label: t('touch.area.belly', { ns: 'role' }),
      value: TouchAreaEnum.Belly,
    },
  ];

  return (
    <div className={classNames(className, styles.container)} style={style}>
      <SideBar
        currentTouchArea={currentTouchArea}
        setCurrentTouchArea={setCurrentTouchArea}
        areaOptions={TOUCH_AREA_OPTIONS}
      />
      <ActionList
        currentTouchArea={currentTouchArea}
        style={{ marginLeft: 12 }}
        areaOptions={TOUCH_AREA_OPTIONS}
      />
    </div>
  );
};

export default memo(Touch);

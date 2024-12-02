import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { ROLE_VIEWER_WIDTH } from '@/constants/common';
import { TouchAreaEnum } from '@/types/touch';

import ActionList from './ActionList';
import SideBar from './SideBar';
import ViewerWithUpload from './ViewerWithUpload';

const useStyles = createStyles(({ css, token, responsive }) => ({
  container: css`
    position: relative;

    display: flex;

    width: 100%;
    min-height: 480px;
    padding: 0 16px;

    background-color: rgba(255, 255, 255, 2%);
    border-radius: ${token.borderRadius}px;

    ${responsive.lg} {
      flex-direction: column;
      min-height: auto;
    }
  `,
  model: css`
    width: ${ROLE_VIEWER_WIDTH}px;
    height: 100%;
    ${responsive.lg} {
      width: 100%;
    }
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
      label: t('touch.area.head'),
      value: TouchAreaEnum.Head,
    },
    {
      label: t('touch.area.arm'),
      value: TouchAreaEnum.Arm,
    },
    {
      label: t('touch.area.leg'),
      value: TouchAreaEnum.Leg,
    },
    {
      label: t('touch.area.chest'),
      value: TouchAreaEnum.Chest,
    },
    {
      label: t('touch.area.belly'),
      value: TouchAreaEnum.Belly,
    },
    {
      label: t('touch.area.buttocks'),
      value: TouchAreaEnum.Buttocks,
    },
  ];

  return (
    <Flexbox className={classNames(className, styles.container)} style={style} horizontal gap={12}>
      <SideBar
        currentTouchArea={currentTouchArea}
        setCurrentTouchArea={setCurrentTouchArea}
        areaOptions={TOUCH_AREA_OPTIONS}
      />
      <ActionList currentTouchArea={currentTouchArea} areaOptions={TOUCH_AREA_OPTIONS} />
      <Flexbox className={styles.model}>
        <ViewerWithUpload />
      </Flexbox>
    </Flexbox>
  );
};

export default memo(Touch);

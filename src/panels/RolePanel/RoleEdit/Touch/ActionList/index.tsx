import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { get } from 'lodash-es';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/components/ListItem';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

import Header from '../components/Header';
import AddOrEdit from './Actions/AddOrEdit';
import Delete from './Actions/Delete';
import Play from './Actions/Play';

const useStyles = createStyles(({ css, token }) => ({
  list: css`
    width: 100%;
  `,

  listItem: css`
    position: relative;

    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
}));

interface AreaListProps {
  areaOptions?: { label: string; value: TouchAreaEnum }[];
  className?: string;
  currentTouchArea: TouchAreaEnum;
  style?: React.CSSProperties;
}

const AreaList = (props: AreaListProps) => {
  const { styles } = useStyles();
  const { currentTouchArea, style, className, areaOptions = [] } = props;
  const [currentAgentTouch] = useAgentStore((s) => [agentSelectors.currentAgentTouch(s)]);
  const { t } = useTranslation('panel');
  const data = currentAgentTouch ? (get(currentAgentTouch, currentTouchArea) as TouchAction[]) : [];

  const touchArea = areaOptions.find((item) => item.value === currentTouchArea)?.label;

  return (
    <Flexbox flex={1} style={style} className={className}>
      <Header
        title={t('touch.touchActionList', { touchArea })}
        extra={<AddOrEdit isEdit={false} touchArea={currentTouchArea} />}
      />
      {data.map((item, index) => {
        return (
          <ListItem
            key={`${item.text}_${index}`}
            className={classNames(styles.listItem)}
            showAction={true}
            avatar={<Play key={`${currentTouchArea}_play_${index}`} touchAction={item} />}
            title={item.text}
            active={false}
            actions={[
              <AddOrEdit
                key={`${currentTouchArea}_edit_${index}`}
                index={index}
                touchArea={currentTouchArea}
                touchAction={item}
                isEdit={true}
              />,
              <Delete
                key={`${currentTouchArea}_delete_${index}`}
                index={index}
                touchArea={currentTouchArea}
              />,
            ]}
          />
        );
      })}
    </Flexbox>
  );
};

export default AreaList;

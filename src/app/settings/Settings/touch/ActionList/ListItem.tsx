import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import { GenderEnum } from '@/types/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

import AddOrEdit from './Actions/AddOrEdit';
import Delete from './Actions/Delete';

interface ActionListItemProps {
  currentTouchArea: TouchAreaEnum;
  gender: GenderEnum;
  index: number;
  item: TouchAction;
}

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    position: relative;

    height: 48px;
    margin-block: 2px;

    font-size: ${token.fontSize}px;

    background-color: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
  `,
}));

const TouchActionListItem = memo<ActionListItemProps>(
  ({ item, index, currentTouchArea, gender }) => {
    const { styles } = useStyles();

    return (
      <ListItem
        key={`${gender}_${item.text}_${index}`}
        className={classNames(styles.listItem)}
        showAction={true}
        title={item.text}
        active={false}
        actions={[
          <AddOrEdit
            key={`${gender}_${currentTouchArea}_edit_${index}`}
            index={index}
            gender={gender}
            touchArea={currentTouchArea}
            touchAction={item}
            isEdit={true}
          />,
          <Delete
            key={`${gender}_${currentTouchArea}_delete_${index}`}
            index={index}
            gender={gender}
            touchArea={currentTouchArea}
          />,
        ]}
      />
    );
  },
);

export default TouchActionListItem;

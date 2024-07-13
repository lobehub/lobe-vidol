import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React, { memo } from 'react';

import ListItem from '@/components/ListItem';
import AddOrEdit from '@/features/Settings/touch/ActionList/Actions/AddOrEdit';
import Delete from '@/features/Settings/touch/ActionList/Actions/Delete';
import { GenderEnum } from '@/types/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

interface ActionListItemProps {
  currentTouchArea: TouchAreaEnum;
  gender: GenderEnum;
  index: number;
  item: TouchAction;
}

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

const TouchActionListItem = memo<ActionListItemProps>(
  ({ item, index, currentTouchArea, gender }) => {
    const { styles } = useStyles();

    return (
      <ListItem
        key={`${item.text}_${index}`}
        className={classNames(styles.listItem)}
        showAction={true}
        title={item.text}
        active={false}
        actions={[
          <AddOrEdit
            key={`${currentTouchArea}_edit_${index}`}
            index={index}
            gender={gender}
            touchArea={currentTouchArea}
            touchAction={item}
            isEdit={true}
          />,
          <Delete
            key={`${currentTouchArea}_delete_${index}`}
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

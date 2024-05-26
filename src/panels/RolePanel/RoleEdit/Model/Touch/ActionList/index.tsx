import { List } from 'antd';
import { createStyles } from 'antd-style';
import { get } from 'lodash-es';

import { TOUCH_AREA_OPTIONS } from '@/constants/touch';
import Delete from '@/panels/RolePanel/RoleEdit/Model/Touch/ActionList/Actions/Delete';
import Edit from '@/panels/RolePanel/RoleEdit/Model/Touch/ActionList/Actions/Edit';
import Play from '@/panels/RolePanel/RoleEdit/Model/Touch/ActionList/Actions/Play';
import { agentSelectors, useAgentStore } from '@/store/agent';
import { TouchAction, TouchAreaEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
  list: css`
    width: 100%;
    padding: 24px;
  `,
  listItem: css``,
}));

interface AreaListProps {
  currentTouchArea: TouchAreaEnum;
}

const AreaList = (props: AreaListProps) => {
  const { styles } = useStyles();
  const { currentTouchArea } = props;
  const [currentAgentTouch] = useAgentStore((s) => [agentSelectors.currentAgentTouch(s)]);

  const data = currentAgentTouch ? (get(currentAgentTouch, currentTouchArea) as TouchAction[]) : [];

  const touchArea = TOUCH_AREA_OPTIONS.find((item) => item.value === currentTouchArea)?.label;

  return (
    <List
      className={styles.list}
      dataSource={data}
      header={<div>触摸{touchArea}时的反应列表</div>}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Play key={`${currentTouchArea}_play_${index}`} touchAction={item} />,
            <Edit
              key={`${currentTouchArea}_edit_${index}`}
              index={index}
              touchArea={currentTouchArea}
              touchAction={item}
            />,
            <Delete
              key={`${currentTouchArea}_delete_${index}`}
              index={index}
              touchArea={currentTouchArea}
            />,
          ]}
          className={styles.listItem}
        >
          <List.Item.Meta title={item.text}></List.Item.Meta>
        </List.Item>
      )}
    />
  );
};

export default AreaList;

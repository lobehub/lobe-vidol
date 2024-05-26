import { List } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import { TOUCH_AREA_LIST } from '@/constants/touch';
import { TouchAreaEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
  list: css`
    width: 240px;
    border-right: 1px solid ${token.colorBorder};
  `,
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
}));

interface IndexProps {
  currentTouchArea: TouchAreaEnum;
  setCurrentTouchArea: (area: TouchAreaEnum) => void;
}

const Index = (props: IndexProps) => {
  const { styles } = useStyles();
  const { currentTouchArea, setCurrentTouchArea } = props;

  return (
    <List
      className={styles.list}
      dataSource={TOUCH_AREA_LIST}
      header={<div style={{ padding: 12 }}>触摸区域列表</div>}
      renderItem={(item) => (
        <List.Item
          className={classNames(styles.listItem, {
            [styles.active]: item.value === currentTouchArea,
          })}
          onClick={() => setCurrentTouchArea(item.value)}
          style={{ padding: 12 }}
        >
          {item.label}
        </List.Item>
      )}
    />
  );
};

export default Index;

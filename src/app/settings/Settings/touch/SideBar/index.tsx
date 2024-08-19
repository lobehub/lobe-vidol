import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { MousePointerClick } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import { TouchAreaEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  item: css`
    position: relative;
    width: 180px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  areaOptions: { label: string; value: TouchAreaEnum }[];
  currentTouchArea: TouchAreaEnum;
  setCurrentTouchArea: (area: TouchAreaEnum) => void;
}

const Index = (props: IndexProps) => {
  const { styles } = useStyles();
  const { currentTouchArea, setCurrentTouchArea, areaOptions = [] } = props;
  const { t } = useTranslation('role');

  return (
    <Flexbox>
      <Header title={t('touch.touchArea')} />
      {areaOptions.map((item) => (
        <ListItem
          avatar={<MousePointerClick />}
          className={classNames(styles.item)}
          active={item.value === currentTouchArea}
          key={item.value}
          title={item.label}
          onClick={() => setCurrentTouchArea(item.value)}
        />
      ))}
    </Flexbox>
  );
};

export default Index;

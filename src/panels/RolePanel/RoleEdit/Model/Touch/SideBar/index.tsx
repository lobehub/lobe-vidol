import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { MousePointerClick } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import ListItem from '@/components/ListItem';
import { TOUCH_AREA_OPTIONS } from '@/constants/touch';
import { TouchAreaEnum } from '@/types/touch';

import Header from '../../components/Header';

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    position: relative;
    width: 180px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  currentTouchArea: TouchAreaEnum;
  setCurrentTouchArea: (area: TouchAreaEnum) => void;
}

const Index = (props: IndexProps) => {
  const { styles } = useStyles();
  const { currentTouchArea, setCurrentTouchArea } = props;
  const { t } = useTranslation('panel');
  return (
    <Flexbox>
      <Header title={t('touch.touchArea')} />
      {TOUCH_AREA_OPTIONS.map((item) => (
        <ListItem
          avatar={<MousePointerClick />}
          className={classNames(styles.listItem)}
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

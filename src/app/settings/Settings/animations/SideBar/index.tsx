import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import { GenderEnum } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  item: css`
    position: relative;
    width: 180px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  currentGender: GenderEnum;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum }[];
  setCurrentGender: (area: GenderEnum) => void;
}

const Index = (props: IndexProps) => {
  const { styles } = useStyles();
  const { currentGender, setCurrentGender, genderOptions = [] } = props;
  const { t } = useTranslation(['panel']);

  return (
    <Flexbox>
      <Header title={t('info.genderLabel')} />
      {genderOptions.map((item) => (
        <ListItem
          avatar={item.icon}
          className={classNames(styles.item)}
          active={item.value === currentGender}
          key={item.value}
          title={item.label}
          onClick={() => setCurrentGender(item.value)}
        />
      ))}
    </Flexbox>
  );
};

export default Index;

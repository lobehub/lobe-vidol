import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ReactNode, memo } from 'react';

import ListItem from '@/components/ListItem';
import { GenderEnum } from '@/types/agent';

const useStyles = createStyles(({ css, token }) => ({
  item: css`
    position: relative;
    width: 100px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  currentGender: GenderEnum | undefined;
  genderOptions: { icon: ReactNode; label: string; value: GenderEnum | undefined }[];
  setCurrentGender: (gender?: GenderEnum) => void;
}

const Index = memo((props: IndexProps) => {
  const { styles } = useStyles();
  const { currentGender, setCurrentGender, genderOptions = [] } = props;

  return (
    <>
      {genderOptions.map((item) => (
        <ListItem
          avatar={item.icon}
          className={classNames(styles.item)}
          active={item.value === currentGender}
          key={`gender-${item.value}`}
          title={item.label}
          onClick={() => setCurrentGender(item.value)}
        />
      ))}
    </>
  );
});

export default Index;

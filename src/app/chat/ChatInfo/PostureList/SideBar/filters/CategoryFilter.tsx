import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { ReactNode, memo } from 'react';

import ListItem from '@/components/ListItem';
import { PostureCategoryEnum } from '@/types/touch';

const useStyles = createStyles(({ css, token }) => ({
  item: css`
    position: relative;
    width: 100px;
    margin-block: 2px;
    border-radius: ${token.borderRadius}px;
  `,
}));

interface IndexProps {
  categoryOptions: { icon: ReactNode; label: string; value: PostureCategoryEnum | undefined }[];
  currentCategory: PostureCategoryEnum | undefined;
  setCurrentCategory: (category?: PostureCategoryEnum) => void;
}

const Index = memo((props: IndexProps) => {
  const { styles } = useStyles();
  const { currentCategory, setCurrentCategory, categoryOptions = [] } = props;
  return (
    <>
      {categoryOptions.map((item) => (
        <ListItem
          avatar={item.icon}
          className={classNames(styles.item)}
          active={item.value === currentCategory}
          key={`category-${item.value}`}
          title={item.label}
          onClick={() => setCurrentCategory(item.value)}
        />
      ))}
    </>
  );
});

export default Index;
